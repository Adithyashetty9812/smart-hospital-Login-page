const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ====================== Ask AI ======================

async function askGemini(userMessage) {

const prompt = `
You are an AI Healthcare Assistant.

Rules:
- Answer ONLY healthcare-related questions.
- Keep the answer between 40 and 80 words.
- Be concise.
- Use VALID Markdown formatting.
- Every heading must be on its own line.
- Every bullet must start on a new line with "- ".
- Never put multiple headings on the same line.
- Never write "### Heading ### Another Heading".
- Never prescribe medicines.
- Never give a definite diagnosis.
- Advise consulting a doctor for serious symptoms.
- Refuse non-health questions politely.

Use EXACTLY this format:

### Possible Causes
- Cause 1
- Cause 2
- Cause 3

### What You Should Do
- Advice 1
- Advice 2

### See a Doctor If
- Warning sign 1
- Warning sign 2

Question:
${userMessage}
`;

    const chatCompletion = await groq.chat.completions.create({

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        model: "llama-3.3-70b-versatile",

        temperature: 0.3,

        max_tokens: 120

    });

    return chatCompletion.choices[0].message.content;

}

module.exports = {
    askGemini
};