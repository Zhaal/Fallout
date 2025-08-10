const { Octokit } = require("@octokit/rest");

const GITHUB_USER = "Zhaal";
const GITHUB_REPO = "Fallout";
const DATA_FILE_PATH = "data/characters.json";

exports.handler = async function(event, context) {
    // This function can be called via GET
    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
    }

    const { GITHUB_TOKEN } = process.env;
    if (!GITHUB_TOKEN) {
        return { statusCode: 500, body: JSON.stringify({ error: "GitHub token is not configured." }) };
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    try {
        const { data: fileData } = await octokit.repos.getContent({
            owner: GITHUB_USER,
            repo: GITHUB_REPO,
            path: DATA_FILE_PATH,
        });

        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        const characters = JSON.parse(content);

        // Remove sensitive data before sending to the client
        const sanitizedCharacters = characters.map(char => {
            const { hashedPassword, ...sanitizedChar } = char;
            return sanitizedChar;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(sanitizedCharacters),
        };

    } catch (error) {
        if (error.status === 404) {
            // If the file doesn't exist, return an empty array
            return { statusCode: 200, body: JSON.stringify([]) };
        }
        console.error("Error fetching characters:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch characters." }),
        };
    }
};
