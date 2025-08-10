const { Octokit } = require("@octokit/rest");

// IMPORTANT: Replace these with your GitHub username and repository name
const GITHUB_USER = "Zhaal";
const GITHUB_REPO = "Fallout";
const DATA_FILE_PATH = "data/characters.json";

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const { GITHUB_TOKEN } = process.env;
    if (!GITHUB_TOKEN) {
        return { statusCode: 500, body: JSON.stringify({ error: "GitHub token is not configured." }) };
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const newCharacter = JSON.parse(event.body);

    try {
        let existingData = [];
        let fileSha = undefined;

        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: GITHUB_USER,
                repo: GITHUB_REPO,
                path: DATA_FILE_PATH,
            });

            // Content is base64 encoded
            const content = Buffer.from(fileData.content, 'base64').toString('utf8');
            existingData = JSON.parse(content);
            fileSha = fileData.sha;

        } catch (error) {
            if (error.status !== 404) {
                throw error; // Rethrow if it's not a 'file not found' error
            }
            // If file doesn't exist, we'll create it. No SHA needed.
        }

        // Add the new character
        existingData.push(newCharacter);
        const updatedContent = JSON.stringify(existingData, null, 2);
        const updatedContentBase64 = Buffer.from(updatedContent).toString('base64');

        await octokit.repos.createOrUpdateFileContents({
            owner: GITHUB_USER,
            repo: GITHUB_REPO,
            path: DATA_FILE_PATH,
            message: `feat: Add new character ${newCharacter.nom}`,
            content: updatedContentBase64,
            sha: fileSha, // Provide SHA if updating an existing file
            branch: 'main' // Or your default branch name
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Character saved successfully!" }),
        };

    } catch (error) {
        console.error("Error saving character to GitHub:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save character." }),
        };
    }
};
