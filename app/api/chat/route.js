import { GLADOS_SYSTEM_PROMPT } from "@/lib/gladosPrompt";

export async function POST(req) {
  try {
    const { message } = await req.json();

    console.log("MY GROQ KEY =", process.env.GROQ_API_KEY);

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content: GLADOS_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.85,
        max_tokens: 100
      })
    });

    const rawText = await groqResponse.text();
    console.log("GROQ STATUS =", groqResponse.status);
    console.log("GROQ RAW TEXT =", rawText);

    const data = JSON.parse(rawText);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Aperture cognition momentarily degraded.";

    return Response.json({ reply });

  } catch (error) {
    console.error("GROQ FETCH ERROR:", error);

    return Response.json({
      reply: "Aperture intelligence systems are malfunctioning. Continue speaking anyway."
    });
  }
}