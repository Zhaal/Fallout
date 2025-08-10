const { Octokit } = require("@octokit/rest");
const bcrypt = require("bcryptjs");

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
    const { id, password } = JSON.parse(event.body);

    if (!id || !password) {
        return { statusCode: 400, body: JSON.stringify({ error: "Character ID and password are required." }) };
    }

    try {
        const { data: fileData } = await octokit.repos.getContent({
            owner: GITHUB_USER,
            repo: GITHUB_REPO,
            path: DATA_FILE_PATH,
        });

        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        const characters = JSON.parse(content);
        const fileSha = fileData.sha;

        const characterToDelete = characters.find(char => char.id === id);

        if (!characterToDelete) {
            return { statusCode: 404, body: JSON.stringify({ error: "Character not found." }) };
        }

        const passwordMatch = bcrypt.compareSync(password, characterToDelete.hashedPassword);

        if (!passwordMatch) {
            return { statusCode: 401, body: JSON.stringify({ error: "Incorrect password." }) };
        }

        // Filter out the character to delete
        const updatedCharacters = characters.filter(char => char.id !== id);
        const updatedContent = JSON.stringify(updatedCharacters, null, 2);
        const updatedContentBase64 = Buffer.from(updatedContent).toString('base64');

        await octokit.repos.createOrUpdateFileContents({
            owner: GITHUB_USER,
            repo: GITHUB_REPO,
            path: DATA_FILE_PATH,
            message: `feat: Delete character ${characterToDelete.nom}`,
            content: updatedContentBase64,
            sha: fileSha,
            branch: 'main'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Character deleted successfully." }),
        };

    } catch (error) {
        console.error("Error deleting character:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete character." }),
        };
    }
};
