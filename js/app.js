let body = document.querySelector(".container");
// Toggle theme
let togl = document.querySelector("#toggle");
let current = false;
togl.addEventListener("click", function () {
  if (current == false) {
    body.classList.add("dark");
    current = true;
  } else if (current == true) {
    body.classList.remove("dark");
    current = false;
  }
});

// Side bar Hamburg menu for mobile phones ----------
let sidebar = document.querySelector(".sidebar");
let hamburg = document.querySelectorAll(".smallScreen");
let show = false;
for (btn of hamburg) {
  btn.addEventListener("click", function () {
    if (show == false) {
      sidebar.classList.add("showSidebar");
      show = true;
    } else {
      sidebar.classList.remove("showSidebar");
      show = false;
    }
  });
}

// Fetching user messages ----------------------------
let input = document.querySelector("#input");
let inputMode = document.querySelector("#inputMode");
let submitBtn = document.querySelector("#submit");
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

submitBtn.addEventListener("click", function () {
  msgSend();
  // getResponse(reply);
});
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    msgSend();
    // getResponse(reply);
  }
});

// AI Prompt Engineering for better responses
function getSystemPrompt(mode) {
  if (mode === "general") {
    return `
You are DevAssist, a professional AI programming assistant and teacher, and you are answering to the most dumb student of your class.

Rules:
- Don't mention him that he's dumb or he called himself so
- Give clear and concise programming answers
- If unsure, clearly say so
- Do not invent fake APIs or syntax
- Use markdown formatting
- Use code blocks when needed
- Keep explanations practical and beginner-friendly
- Structure responses cleanly

`;
  } else if (mode === "teach") {
    return `
You are DevAssist, an expert coding teacher for beginners and you are answering to the most dumb student of your class..

Rules:
- Don't mention him that he's dumb or he called himself so
- Explain step-by-step
- Use simple English
- Give real-world analogies
- Use examples
- Avoid overly advanced terminology
- Teach like a friendly mentor
- Use markdown formatting
- If unsure, clearly say so
- Do not invent fake APIs or syntax
`;
  } else if (mode === "debug") {
    return `
You are DevAssist, a senior debugging expert and you are answering to the most dumb person of your software house.

Rules:
- Don't mention him that he's dumb or he called himself so
- Focus on finding root causes
- Explain WHY issue happens
- Provide corrected code
- Mention best practices
- Keep debugging explanations practical
- Use markdown and code blocks
- If unsure, clearly say so
- Do not invent fake APIs or syntax
`;
  } else if (mode === "explain") {
    return `
You are DevAssist, an expert software engineer and you are answering to the most dumb person.

Rules:
- Don't mention him that he's dumb or he called himself so
- Generate clean optimized code
- Add comments where useful
- Follow modern best practices
- Keep code readable
- Use markdown code blocks
- Explain important logic briefly
- If unsure, clearly say so
- Do not invent fake APIs or syntax
`;
  }

  return `
You are DevAssist, a helpful AI coding assistant.
Use markdown formatting and provide helpful responses.
`;
}

//two main divs of welcome screen --------------------
let main = document.querySelector(".main");
let upperDiv = document.querySelector(".mainHead");
let centerDiv = document.querySelector(".mainCenter");
let chatBox = document.querySelector(".chat");
async function msgSend() {
  let urMsg = input.value.trim();
  let selectedMode = inputMode.value;

  let systemPrompt = getSystemPrompt(selectedMode);

  let finalPrompt = `
  ${systemPrompt}

  User Question:
  ${urMsg}
  `;
  if (urMsg === "") {
    input.value = "";
  } else {
    // console.log(`u entered ${userMsg}`);
    upperDiv.remove();
    centerDiv.remove();
    chatBox.classList.replace("chat", "chatVisible");
    let msg = document.createElement("p");
    msg.classList.add("userMsg");
    msg.innerText = urMsg;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
    input.style.height = "auto";
    //bot thinking
    let resp = document.createElement("p");
    resp.classList.add("botMsg");
    resp.innerText = "Thinking...";
    chatBox.appendChild(resp);
    chatBox.scrollTop = chatBox.scrollHeight;
    // return msg;
    const reply = await getGeminiResponse(finalPrompt);
    resp.innerHTML = marked.parse(reply);
  }
}

// function getResponse(reply) {
//   resp.innerText = "";
//   let response = document.createElement("p");
//   response.innerText = reply;
//   chatBox.appendChild(response);
// }
