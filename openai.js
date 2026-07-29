
async function getSizeFromAI(measurements) {
  const prompt = `
You are a professional fashion sizing assistant.

A customer entered these measurements.

Height: ${measurements.height} cm
Weight: ${measurements.weight} kg
Gender: ${measurements.gender}
Chest: ${measurements.chest} cm
Waist: ${measurements.waist} cm
Hip: ${measurements.hip} cm
Shoulder: ${measurements.shoulder} cm
Preferred Fit: ${measurements.fit}

Return ONLY valid JSON.

{
  "shirtSize":"",
  "trouserSize":"",
  "bodyShape":"",
  "fitType":"",
  "recommendation":""
}

Rules:
- Return ONLY the JSON object.
- Do not use markdown.
- Do not wrap it inside \`\`\`.
- recommendation should be one short sentence.
`;

  const response = await fetch("/.netlify/functions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();

  console.log("Response status:", response.status);
  console.log("Response data:", data);

  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini request failed");
  }

  return data.candidates[0].content.parts[0].text;
}
