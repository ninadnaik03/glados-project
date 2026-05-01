export async function POST(req) {
  try {
    const { transcript } = await req.json();

    if (!transcript || !transcript.trim()) {
      return Response.json({
        reply: "Speak, test subject.",
        audio: null,
      });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const chatRes = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: transcript }),
    });

    const chatData = await chatRes.json();

    const ttsRes = await fetch(`${baseUrl}/api/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: chatData.reply }),
    });

    const ttsData = await ttsRes.json();

    return Response.json({
      reply: chatData.reply,
      audio: ttsData.audio,
    });
  } catch (error) {
    console.error("CONVERSATION LOOP ERROR:", error);

    return Response.json({
      reply: "Aperture Science systems are briefly collapsing. Try speaking again.",
      audio: null,
    });
  }
}