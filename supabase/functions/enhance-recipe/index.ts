import OpenAI from 'npm:openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { title, ingredients, steps } = await req.json();

    const client = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    const message = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 2048,
      messages: [
        {
          role: 'system',
          content: `You are a professional baker and recipe editor. The user will submit a raw recipe. Your job is to: 1) Fix any unclear steps, 2) Standardize ingredient measurements, 3) Add helpful tips where appropriate, 4) Structure it with clear sections: Ingredients, Method, Tips. Return valid JSON with fields: title, description, ingredients (array of {amount, unit, item}), steps (array of {step_number, instruction, tip?}), tags (array of strings). Return ONLY the JSON object with no markdown or explanation.`,
        },
        {
          role: 'user',
          content: `Title: ${title}\n\nIngredients:\n${ingredients}\n\nSteps:\n${steps}`,
        },
      ],
    });

    const text = message.choices[0].message.content ?? '';
    const enhanced = JSON.parse(text);

    return new Response(JSON.stringify(enhanced), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
