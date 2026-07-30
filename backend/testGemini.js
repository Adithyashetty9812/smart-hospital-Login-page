require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function test() {

    try {

        console.log("Testing Gemini...");

        const response = await ai.models.generateContent({

            model: "gemini-flash-latest",

            contents: "Say hello in one sentence."

        });

        console.log("\n✅ SUCCESS!");
        console.log(response.text);

    }
    catch (error) {

        console.log("\n❌ ERROR:");
        console.log(error);

    }

}

test();