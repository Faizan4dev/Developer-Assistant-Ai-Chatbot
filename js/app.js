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

//two main divs of welcome screen --------------------
let main = document.querySelector(".main");
let upperDiv = document.querySelector(".mainHead");
let centerDiv = document.querySelector(".mainCenter");
let chatBox = document.querySelector(".chat");
async function msgSend() {
  let urMsg = input.value.trim();
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
    input.value = "";
    input.style.height = "auto";
    //bot thinking
    let resp = document.createElement("p");
    resp.classList.add("botMsg");
    resp.innerText = "Thinking...";
    chatBox.appendChild(resp);
    // return msg;
    const reply = await getGeminiResponse(urMsg);
    resp.innerText = reply;
  }
}

// function getResponse(reply) {
//   resp.innerText = "";
//   let response = document.createElement("p");
//   response.innerText = reply;
//   chatBox.appendChild(response);
// }
