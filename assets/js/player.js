import { disableChat, enableChat } from "./chat";
import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const timer = document.getElementById("jsTimer");

let leader, time, targetTimer

const addPlayers = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

const leaderClassAdd = (player) => {
  leader = document.getElementById(player.id);
  leader.classList.add("leader");
}

const leaderClassRemove = () => {
  leader.classList.remove("leader");
}

const startTimer = () => {
  if(time > 0){
    time -= 1;
    timer.innerText = `${time < 10 ? `0${time}` : time} sec`
  } else {
    clearTimer();
  }
}

const clearTimer = () => {
  time = 0;
  timer.innerText = ""
  clearInterval(targetTimer);
}

const handleTimer = (timeSet) => {
  time = timeSet;
  targetTimer = setInterval(startTimer, 1000);
}

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = ({ leader, timeSet }) => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
  leaderClassAdd(leader);
  handleTimer(timeSet);
};
export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader, paint: ${word}`;
};
export const handleGameEnded = () => {
  setNotifs("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
  leaderClassRemove();
  clearTimer();
};

export const handleGameStarting = () => setNotifs("Game will start soon");
