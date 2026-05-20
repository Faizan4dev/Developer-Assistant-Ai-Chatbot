async function getGeminiResponse(prompt) {
  let url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAcdcAazQYCq3CE6pOZ4-234OAV6DWrP2s";

  try {
    let resp = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return resp.data.candidates[0].content.parts[0].text;
    //   console.log(resp);
  } catch (error) {
    return "Something went Wrong";
  }
}
