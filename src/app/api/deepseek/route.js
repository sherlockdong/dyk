import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1", // Ensure the URL includes '/v1'
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing prompt in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-chat",
    });

    return new Response(
      JSON.stringify({ response: completion.choices[0].message.content }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
