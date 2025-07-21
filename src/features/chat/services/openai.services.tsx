const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getAssistantReply = async (userMessage: string): Promise<string> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un asistente personal cálido y empático.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Lo siento, no pude responder.";
};