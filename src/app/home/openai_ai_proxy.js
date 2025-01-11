'use server'
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function filterRespones(item) {
const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Look at the headline, if it is positive, say POSITIVE, otherwise say NEGATIVE. ONLY SAY THESE TWO WORDS.",
      },
      { role: "user", content: item.title },
    ],
  });

  const response = completion.choices?.[0]?.message?.content || ""
  return response;
}