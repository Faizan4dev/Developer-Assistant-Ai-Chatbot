async function getGeminiResponse(prompt) {
  try {
    let resp = await axios.post("/api/chat", {
      prompt: prompt,
    });

    return resp.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.log(error);

    return "⚠️ Something went wrong.";
  }
}
