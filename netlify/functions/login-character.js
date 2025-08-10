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
    const { nom, password } = JSON.parse(event.body);

    if (!nom || !password) {
        return { statusCode: 400, body: JSON.stringify({ error: "Character name and password are required." }) };
    }

    try {
        const { data: fileData } = await octokit.repos.getContent({
            owner: GITHUB_USER,
            repo: GITHUB_REPO,
            path: DATA_FILE_PATH,
        });

        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        const characters = JSON.parse(content);

        // Find character by name (case-insensitive)
        const character = characters.find(char => char.nom.toLowerCase() === nom.toLowerCase());

        if (!character) {
            return { statusCode: 404, body: JSON.stringify({ error: "Character not found." }) };
        }

        const passwordMatch = bcrypt.compareSync(password, character.hashedPassword);

        if (!passwordMatch) {
            return { statusCode: 401, body: JSON.stringify({ error: "Incorrect password." }) };
        }

        // On successful login, return the full character object
        return {
            statusCode: 200,
            body: JSON.stringify(character),
        };

    } catch (error) {
        if (error.status === 404) {
            return { statusCode: 404, body: JSON.stringify({ error: "Character data file not found."}) };
        }
        console.error("Error during login:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Login failed." }),
        };
    }
};
