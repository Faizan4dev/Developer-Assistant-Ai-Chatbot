let body = document.querySelector(".container");
let currentSession = [];
let allSessions = [];
let loadedOldChat = false;
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
let recentChats = document.querySelector("#recentChats");

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
    currentSession.push({
      user: urMsg,
      bot: reply,
    });
    resp.innerHTML = marked.parse(reply);
  }
}

// new chat
let chatBox = document.querySelector(".chat");
let newChatBtn = document.querySelector("#img2");
newChatBtn.addEventListener("click", startNewChat);

function startNewChat() {
  // Prevent empty sessions
  if (currentSession.length > 0 && !loadedOldChat) {
    // Save current session
    allSessions.push(JSON.parse(JSON.stringify(currentSession)));

    // Remove placeholder text
    if (recentChats.innerText.includes("no recent chats")) {
      recentChats.innerHTML = "";
    }

    // Create sidebar preview
    let chatPreview = document.createElement("p");

    // Preview text
    chatPreview.innerText = currentSession[0].user.slice(0, 20) + "...";

    // Styling
    chatPreview.style.backgroundColor = "#e5e7eb";
    chatPreview.style.borderRadius = "1rem";
    chatPreview.style.padding = "0.5rem";
    chatPreview.style.margin = "0.3rem";
    chatPreview.style.cursor = "pointer";

    // Store session index
    chatPreview.dataset.index = allSessions.length - 1;

    // Open old chat on click
    chatPreview.addEventListener("click", loadChat);

    // Add to sidebar
    // recentChats.appendChild(chatPreview);
    recentChats.prepend(chatPreview);
  }

  // Reset current session
  currentSession = [];

  // Clear current chat UI
  chatBox.innerHTML = "";

  // Hide chat container
  chatBox.classList.replace("chatVisible", "chat");

  // Restore welcome screen
  main.prepend(upperDiv);

  main.insertBefore(centerDiv, document.querySelector(".mainFooter"));
  loadedOldChat = false;
}
// function getResponse(reply) {
//   resp.innerText = "";
//   let response = document.createElement("p");
//   response.innerText = reply;
//   chatBox.appendChild(response);
// }

function loadChat(event) {
  // get clicked chat index
  let sessionIndex = event.target.dataset.index;

  // get selected session
  let selectedSession = allSessions[sessionIndex];

  // clear current UI
  chatBox.innerHTML = "";

  // remove welcome screen
  upperDiv.remove();
  centerDiv.remove();

  // show chat container
  chatBox.classList.replace("chat", "chatVisible");

  // rebuild messages
  for (let message of selectedSession) {
    // user bubble
    let userBubble = document.createElement("p");
    userBubble.classList.add("userMsg");
    userBubble.innerText = message.user;

    // bot bubble
    let botBubble = document.createElement("p");
    botBubble.classList.add("botMsg");
    botBubble.innerHTML = marked.parse(message.bot);

    // append both
    chatBox.appendChild(userBubble);
    chatBox.appendChild(botBubble);
  }

  // scroll bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // make this active session
  currentSession = [...selectedSession];
  loadedOldChat = true;
}
