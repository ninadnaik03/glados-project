export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return Response.json({ audio: null });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.28,
            similarity_boost: 0.82,
            style: 0.95,
            use_speaker_boost: true,
          },
        }),
      }
    );

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    return Response.json({ audio: base64Audio });
  } catch (error) {
    console.error("ELEVENLABS TTS ERROR:", error);
    return Response.json({ audio: null });
  }
}