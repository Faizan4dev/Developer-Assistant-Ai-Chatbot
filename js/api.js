const API_KEYS = [
  "AIzaSyAbWtUFMJIBdBFOTz8YN0ykbuAQm5z8otA",
  "AIzaSyB42AXP4kR3w5nKmYftFktYt9w_QIz7p9A",
  "AIzaSyCktstxg_wic1GdUDk1S2S4z7bi0jl9_V0",
  "AIzaSyABRMvnRqoR6FiCKKAac2I5FSY7OcgaMhU",
  "AIzaSyADsxEXeRdf_m_m_cyVwN8U4P4hD9Hq2k0",
];

let currentKeyIndex = 0;

async function getGeminiResponse(prompt) {
  // Try all keys one-by-one
  for (let i = 0; i < API_KEYS.length; i++) {
    let selectedKey = API_KEYS[currentKeyIndex];

    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${selectedKey}`;

    try {
      console.log(`Trying key ${currentKeyIndex + 1}`);

      let resp = await axios.post(url, {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      });

      // Move to next key for future request
      currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;

      return resp.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.log(`Key ${currentKeyIndex + 1} failed`, error.response?.status);

      // Try next key
      currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    }
  }
  // If all keys fail
  return "⚠️ All servers are busy right now. Please try again.";
}
