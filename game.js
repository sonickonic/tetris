const container = document.querySelector(".player-one__grid");
const btnNewGame = document.querySelector(".btn-new");
const btnPause = document.querySelector(".btn-pause");

function createRow(table, row) {
  const rowElement = document.createElement("tr");
  table.appendChild(rowElement);
  row.map((item) => createBlock(rowElement, item));
}

function createBlock(rowElement, item) {
  if (item) {
    const block = document.createElement("td");
    block.classList.add("full");
    rowElement.appendChild(block);
  } else {
    const block = document.createElement("td");
    block.classList.add("td");
    rowElement.appendChild(block);
  }
}

function renderGrid(json) {
  const table = document.createElement("table");
  container.appendChild(table);
  json.grid.map((row) => createRow(table, row));
}

const renderGame = (json) => {
  container.innerHTML = "";
  renderGrid(json);
};

btnNewGame.addEventListener("click", () => syncAction("new_game"));
btnPause.addEventListener("click", () => syncAction("pause"));

window.onkeydown = function (e) {
  syncAction(e.key);
};

window.onkeyup = function (e) {
  if (e.keyCode == 32) {
    syncAction(e.keyCode);
  }
};

function syncAction(type) {
  const data={type};

  fetch("http://andrewftv.hopto.org/tetris/command.php", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const syncGame = () =>
  fetch("http://andrewftv.hopto.org/tetris/state.php")
    .then((result) => result.json())
    .then((json) => renderGame(json));
setInterval(syncGame, 1000)
syncGame();
