let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let numberOfClicks = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  numberOfClicks = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log(box.id);

    if (turn0) {
      box.innerHTML = "O";
      turn0 = false;

      let zeroClassStatus = box.classList.contains("cross");

      if (zeroClassStatus === true) {
        box.classList.remove("cross");
        box.classList.add("zero");
      } else {
        box.classList.add("zero");
      }

      // console.log(a);
      // console.log(box);
    } else {
      box.innerHTML = "X";
      turn0 = true;

      let crossClassStatus = box.classList.contains("zero");

      if (crossClassStatus === true) {
        box.classList.remove("zero");
        box.classList.add("cross");
      } else {
        box.classList.add("cross");
      }

      // box.classList.add("cross");
      // console.log(box);
    }

    numberOfClicks++;
    box.disabled = true;

    checkWinner();
  });
});

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

function checkWinner() {
  let w = "";
  for (let pattern of winPatterns) {
    // console.log(pattern[0],pattern[1],pattern[2]);

    let pos1Value = boxes[pattern[0]].innerHTML;
    let pos2Value = boxes[pattern[1]].innerHTML;
    let pos3Value = boxes[pattern[2]].innerHTML;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        w = pos1Value;
        // console.log("winner", pos1Value)
        showWinner(w);
      }
    }
  }

  if (numberOfClicks === 9) {
    if (w) {
      showWinner(w);
    } else {
      msg.innerHTML = `DRAW !!`;
      msgContainer.classList.remove("hide");
      disabledBoxes();
    }
  }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
