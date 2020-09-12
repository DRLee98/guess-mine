const { initSockets } = require("./sockets");

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const input = loginForm.querySelector("input");
const errorBox = document.getElementById("jsError");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

let name = "";

const socket = io("/");

const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
  // eslint-disable-next-line no-undef
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  name = input.value;
  socket.emit(window.events.nameCheck, { nickname: name });
};

const handleNameOverlap = ({ overlap }) => {
  if (overlap) {
    errorBox.innerText = "Name Overlap";
  } else {
    input.value = "";
    localStorage.setItem(NICKNAME, name);
    body.className = LOGGED_IN;
    logIn(name);
  }
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

socket.on(window.events.nameOverlap, handleNameOverlap);
