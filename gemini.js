async function getSizeFromAI(measurements) {

    let measurementText = `
Height: ${measurements.height} cm
Weight: ${measurements.weight} kg
Gender: ${measurements.gender}
Preferred Fit: ${measurements.fit}
`;


    if (measurements.gender === "Male") {

        measurementText += `
Chest: ${measurements.chest} cm
Waist: ${measurements.waist} cm
`;
    }

    if (measurements.gender === "Female") {

        measurementText += `
Bust: ${measurements.bust} cm
Waist: ${measurements.waist} cm
Hip: ${measurements.hip} cm
`;

    }


    const prompt = `

You are AVIT's professional clothing sizing assistant.

A customer entered the following measurements:

${measurementText}

Based on these measurements, recommend an appropriate clothing size.

Important:
- Use the measurements to estimate clothing size.
- Consider the customer's preferred fit.
- Do not make comments about whether the customer's body is good, bad, attractive, ideal or unattractive.
- Do not suggest changing their body.
- Only provide useful clothing-size information.

Return ONLY valid JSON.

{
    "shirtSize": "",
    "trouserSize": "",
    "bodyShape": "",
    "fitType": "",
    "recommendation": ""
}

Rules:

- Return ONLY the JSON object.
- Do not use markdown.
- Do not wrap the JSON in code blocks.
- shirtSize should be a practical clothing size such as S, M, L, XL, XXL.
- trouserSize can use a Nigerian/international clothing size or waist size where appropriate.
- fitType should reflect the customer's selected fit.
- recommendation should be one short sentence.
`;


    const response = await fetch("/api/gemini", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt
        })

    });


    const data = await response.json();


    console.log(
        "Response status:",
        response.status
    );

    console.log(
        "Response data:",
        data
    );


    if (!response.ok) {

        throw new Error(
            data.error?.message ||
            data.error ||
            "Gemini request failed"
        );

    }


    return data
        .candidates[0]
        .content
        .parts[0]
        .text;

}
