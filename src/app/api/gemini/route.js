import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt } = await request.json();
  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyADnjHCpAg296CYGiYAyFxIlf1ixRLkwgw`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const gRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!gRes.ok) {
      const errText = await gRes.text();
      return NextResponse.json({ error: errText }, { status: gRes.status });
    }

    const data = await gRes.json();
    const generated = data.candidates?.[0]?.content?.parts?.[0]?.text ?? JSON.stringify(data);

    return NextResponse.json({ result: generated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}