const socket = io("ws://localhost:3500");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  const text = li.textContent;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = window.getComputedStyle(li).getPropertyValue("font");
  const textWidth = context.measureText(text).width + 30;
  li.style.width = `${textWidth}px`;
  document.querySelector("ul").appendChild(li);
});

socket.on("id", (data) => {
  // Przypisanie wartości socket.id do elementu o id 'userId'
  document.getElementById("userId").setAttribute("data-userId", data);
  console.log(`User ID: ${data}`);
});

// Wywołanie funkcji setId na załadowanie strony
function setId(e) {
  e.preventDefault();
}

// Nasłuchiwanie zdarzenia 'id' z serwera
socket.on("id", (data) => {
  console.log("Otrzymano zdarzenie id z serwera:", data);
  // Przypisanie wartości socket.id do elementu o id 'userId' po otrzymaniu zdarzenia 'id'
  document.getElementById("userId").setAttribute("data-userId", data);
});

// Funkcja wywołująca setId przy załadowaniu strony
document.addEventListener("DOMContentLoaded", setId);
