async function getGeminiResponse(prompt) {
  let url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCGahNncg9c8VIVSbhdO_7PAv0Wx0KWtSQ";

  let resp = await axios.post(url, {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  });

  console.log(resp.data.candidates[0].content.parts[0].text);
  //   console.log(resp);
}
