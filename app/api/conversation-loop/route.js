export async function POST(req) {
  try {
    const { transcript } = await req.json();

    if (!transcript || !transcript.trim()) {
      return Response.json({
        reply: "Speak, test subject.",
        audio: null,
      });
    }

    const baseUrl = new URL(req.url).origin;

    console.log("BASE URL:", baseUrl);

    const chatRes = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: transcript }),
    });

    const chatText = await chatRes.text();
    console.log("CHAT RAW RESPONSE:", chatText);

    const chatData = JSON.parse(chatText);

    const ttsRes = await fetch(`${baseUrl}/api/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: chatData.reply }),
    });

    const ttsText = await ttsRes.text();
    console.log("TTS RAW RESPONSE:", ttsText);

    const ttsData = JSON.parse(ttsText);

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