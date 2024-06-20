"use strict";
const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");
let userMessage;
const API_KEY = "sk-proj-xtk0MnNG5oY5jLloBLKxT3BlbkFJpeRO8XGIF0jQEYBlg52g";
const URL = "https://api.openai.com/v1/chat/completions";
const chatGenerator = (robot) => {
  robot = robot.querySelector(".robot");
  const requestOption = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: userMessage,
        },
      ],
    }),
  };
  fetch(URL, requestOption)
    .then((res) => res.json())
    .then((data) => {
      robot.textContent = data.choices[0].message.content;
    })
    .catch((error) => {
      robot.textContent = error;
    });
};
// manage chat
function manageChat() {
  userMessage = inputEl.value.trim();
  if (!userMessage) return;
  inputEl.value = "";
  cardBodyEl.appendChild(messageEl(userMessage, "user"));
  setTimeout(() => {
    const robotMessage = messageEl("Thinking...........", "chat-bot");
    cardBodyEl.append(robotMessage);
    chatGenerator(robotMessage);
  }, 600);
}
// messages
const messageEl = (message, className) => {
  const chatEl = document.createElement("div");
  chatEl.classList.add("chat", `${className}`);
  let chatContent =
    className === "chat-bot"
      ? `<span class="user-icon"><i class="fa fa-robot"></i></span>
  <p class='robot'>${message}</p>`
      : ` <span class="user-icon"><i class="fa fa-user"></i></span>
  <p>${message}</p>`;
  chatEl.innerHTML = chatContent;
  return chatEl;
};
btnEl.addEventListener("click", manageChat);
inputEl.addEventListener("input", (e) => {
  e.preventDefault();
  e.target.addEventListener("keydown", (keyboard) => {
    if (keyboard.key === "Enter") {
      manageChat();
    }
  });
});