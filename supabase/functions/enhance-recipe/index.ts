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

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: `You are a professional baker and recipe editor. The user will submit a raw recipe. Your job is to: 1) Fix any unclear steps, 2) Standardize ingredient measurements, 3) Add helpful tips where appropriate, 4) Structure it with clear sections: Ingredients, Method, Tips. Return valid JSON with fields: title, description, ingredients (array of {amount, unit, item}), steps (array of {step_number, instruction, tip?}), tags (array of strings). Return ONLY the JSON object with no markdown or explanation.`,
        messages: [
          {
            role: 'user',
            content: `Title: ${title}\n\nIngredients:\n${ingredients}\n\nSteps:\n${steps}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${response.status} ${err}`);
    }

    const data = await response.json();
    let text = data.content?.[0]?.text ?? '';
    // Strip markdown code fences if Claude wraps the JSON
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
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
