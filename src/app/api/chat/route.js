import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

export async function POST(request) {
    try {
        const { messages } = await request.json();

        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: messages }],
            stream: true,
        });
        return Response.json({
            response : completions.choices[0].message.content

        })
    } catch (error) {
     return Response.json(
        { error: 'An error occurred while processing your request.' },
        { status: 500 }
     );   
    }
}