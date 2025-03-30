"use strict";
// import bezier from "./bezier.js";
const words = [
  "dyke",
  "abyss",
  "swamp",
  "moss",
  "pub", //five or lower
  "whiskey",
  "quirky",
  "lettuce",
  "quantum",
  "icefall", //seven or lower
  "mountain",
  "sabotage",
  "jackhammer",
  "leprechaun",
  "tablecloth", //10 or lower
  "taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu",
  "llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
  "chargoggaggoggmanchauggaggoggcharbunugungamaugg",
  "pneumonoultramicroscopicsilicovolcanoconiosis",
  "hippopotomonstrosesquipedaliaphobia", //everything else
];
let myGame;
const canvas = get("#canvas");
const ctx = canvas.getContext("2d");
function start(mode) {
  get("#guess").disabled = false;
  get(".opening-text").classList.add("d-none");
  get(".opening-card").classList.add("open-card-anim");
  setTimeout(
    () => {
      get(".opening-card").classList.add("open-card-anim-done");
      let height = (get(".opening-card").offsetHeight / 2) * 2.5;
      document.getElementsByTagName("STYLE")[0].append(`
        .openedCard::after, .openedCard::before {
        position: absolute;
        left: 50%;
        transform: scaleX(1) scaleY(1) translateX(-50%);
        animation: none;
        width: ${get(".opening-card").offsetWidth * 1.6}px;
        height: ${height}px;
        }  
        .opening-card {
        max-height: none !important;
        width: ${get(".opening-card").offsetWidth * 1.6}px;
        height: ${get(".opening-card").offsetHeight * 2.5}px !important;
        }
      `);
      get(".opening-card").classList.add("openedCard");
      get(".opening-card").classList.remove("open-card-anim");
      get(".gameText").classList.remove("d-none");
      get(".gameText").classList.add("fade-in");
      setTimeout(() => {
        get(".gameText").classList.remove("fade-in");
        get("#canvas").width = get("canvas").offsetWidth;
        get("#canvas").height = get("canvas").offsetHeight;
        let selection = words.filter((val) => {
          if (mode == 1) return val.length <= 5;
          if (mode == 2) return val.length > 5 && val.length <= 7;
          if (mode == 3) return val.length > 7 && val.length <= 10;
          if (mode == 4) return val.length > 10;
        });
        switch (mode) {
          case 1:
            get(".difficulty").textContent = "Easy Mode";
            get(".difficulty").id = "easy";
            break;
          case 2:
            get(".difficulty").textContent = "Medium Mode";
            get(".difficulty").id = "medium";
            break;
          case 3:
            get(".difficulty").textContent = "Hard Mode";
            get(".difficulty").id = "hard";
            break;
          case 4:
            get(".difficulty").textContent = "Ridiculous Mode";
            get(".difficulty").id = "ridiculous";
            break;
        }
        myGame = new Game(
          selection[Math.floor(Math.random() * selection.length)],
          0,
          0
        );
        myGame.init();
      }, 500);
    },
    4000,
    document
  );
}
function modeButtons() {
  get(".button-start").classList.add("fade-out");
  let btnRow = get(".button-row");
  btnRow.classList.remove("d-none");
  btnRow.classList.add("fade-in");
  let length = Array.from(document.querySelectorAll(".button-row .m-1"));
  length = length[3];
  document.querySelectorAll(".button-row .m-1").forEach((elem) => {
    elem.setAttribute("style", `width: ${length.offsetWidth}px`);
  });
  setTimeout(() => {
    get(".button-start").classList.add("d-none");
    get(".button-start").classList.remove("fade-out");
    btnRow.classList.add("d-block");
    btnRow.classList.remove("fade-in");
  }, 500);
}
class Game {
  word;
  mode;
  stage;
  constructor(word, mode, stage) {
    this.word = word.split("");
    this.mode = mode;
    this.letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    this.slots = [];
    this.not = [];
    this.stage = stage;
  }
  stageIncr() {
    let cS = this.stage;
    cS++;
    this.stage = cS;
    let width = Number(canvas.offsetWidth);
    let height = Number(canvas.offsetHeight);
    //6 stages
    if (cS == 1) {
      let head = bezier(
        80,
        3,
        ctx,
        { x: 173, y: height - 200 },
        { x: 215, y: height - 150 },
        { x: 125, y: height - 150 },
        { x: 167, y: height - 200 }
      );
      this.stop(head.points.length * 15);
      head.draw(15, 2, "rgb(0,0,0)");
    }
    if (cS == 2) {
      let body = bezier(
        80,
        3,
        ctx,
        { x: 170, y: height - 160 },
        { x: 170, y: height - 120 },
        { x: 170, y: height - 80 }
      );
      this.stop(body.points.length * 15);
      body.draw(15, 4, "rgb(0,0,0)");
    }
    if (cS == 3) {
      let rArm = bezier(
        80,
        3,
        ctx,
        { x: 170, y: height - 160 },
        { x: 185, y: height - 145 },
        { x: 200, y: height - 130 }
      );
      this.stop(rArm.points.length * 15);
      rArm.draw(15, 2, "rgb(0,0,0)");
    }
    if (cS == 4) {
      let lArm = bezier(
        80,
        3,
        ctx,
        { x: 170, y: height - 160 },
        { x: 155, y: height - 145 },
        { x: 140, y: height - 130 }
      );
      this.stop(lArm.points.length * 15);
      lArm.draw(15, 2, "rgb(0,0,0)");
    }
    if (cS == 5) {
      let rLeg = bezier(
        80,
        3,
        ctx,
        { x: 170, y: height - 80 },
        { x: 185, y: height - 65 },
        { x: 195, y: height - 50 }
      );
      this.stop(rLeg.points.length * 15);
      rLeg.draw(15, 2, "rgb(0,0,0)");
    }
    if (cS == 6) {
      let lLeg = bezier(
        80,
        3,
        ctx,
        { x: 170, y: height - 80 },
        { x: 155, y: height - 65 },
        { x: 145, y: height - 50 }
      );
      this.stop(lLeg.points.length * 15);
      lLeg.draw(15, 2, "rgb(0,0,0)");
      setTimeout(() => {
        this.end(2);
      }, lLeg.points.length * 15 + 20);
    }
  }
  init() {
    let container = get(".wordCont");
    this.slots = new Array(this.word.length);
    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i] = "_";
    }
    container.textContent = this.slots.join(" ");
    this.gallows();
    get("#guess").focus();
  }
  gallows() {
    let width = Number(canvas.offsetWidth);
    let height = Number(canvas.offsetHeight);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(20, height - 20, 100, 20);
    ctx.stroke();
    ctx.fillRect(63, height - 220, 14, 200);
    ctx.stroke();
    ctx.fillRect(63, height - 234, 109, 14);
    ctx.stroke();
    //string
    ctx.fillRect(168, height - 220, 4, 20);
    ctx.stroke();
    this.drawLetters();
  }
  guess(arg) {
    if (this.word.includes(arg)) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] == arg) {
          this.slots[i] = arg;
        }
      }
      get(".wordCont").textContent = this.slots.join(" ");
    } else {
      this.not.push(arg);
      this.stageIncr();
    }
    if (this.slots.join("") == this.word.join("")) {
      get(".wordCont").classList.add("fade-out");
      get("#guess").disabled = true;
      setTimeout(
        () => {
          get(".wordCont").textContent = this.slots.join("");
          if (
            this.slots.join("").includes("tau") ||
            this.slots.join("").includes("llan") ||
            this.slots.join("").includes("char")
          ) {
            get(".wordCont").textContent =
              this.slots[0].toUpperCase() +
              this.slots.slice(1, this.slots.length).join("");
          }
          get(".wordCont").classList.remove("fade-out");
          get(".wordCont").classList.add("fade-in");
          setTimeout(() => {
            this.end(1);
          }, 2000);
        },
        500,
        this
      );
    }
    this.drawLetters();
  }
  stop(arg) {
    get("#guess").classList.add("off");
    get("#guess").disabled = true;
    setTimeout(() => {
      get("#guess").classList.remove("off");
      get("#guess").disabled = false;
      get("#guess").focus();
    }, arg);
  }
  end(arg) {
    let container = get(".openedCard");
    get(".gameText").classList.add("fade-out");
    setTimeout(
      () => {
        get(".gameText").classList.remove("fade-out");
        get(".gameText").classList.add("d-none");
        container.classList.remove("open-card-anim-done");
        container.classList.remove("openedCard");
        container.classList.add("close-card-anim");
        document.getElementsByTagName("STYLE")[0].innerHTML = "";
        setTimeout(
          () => {
            container.classList.remove("close-card-anim");
            if (arg == 1) {
              get("#winnerMessage").textContent = "Victory!";
              get(".winText").classList.remove("d-none");
              get(".winText").classList.add("fade-in");
              setTimeout(() => {
                get(".winText").classList.remove("fade-in");
              }, 500);
            } else if (arg == 2) {
              get("#winnerMessage").textContent = "Defeated!";
              get(".winText").classList.remove("d-none");
              get(".winText").classList.add("fade-in");
              setTimeout(() => {
                get(".winText").classList.remove("fade-in");
              }, 500);
            }
          },
          5000,
          arg
        );
      },
      500,
      container,
      arg
    );
  }
  drawLetters() {
    ctx.clearRect(250, 0, canvas.offsetWidth - 250, canvas.offsetHeight);
    let remainingWidth = canvas.offsetWidth - 300;
    let columns = Math.floor(remainingWidth / 30);
    let rows = Math.ceil(this.not.length / columns);
    let textArr = new Array(rows);
    let temp = [];
    temp.push(...this.not);
    for (let i = 0; i < rows; i++) {
      textArr[i] = new Array(columns);
    }
    for (let i = 0; i < rows; i++) {
      for (let q = 0; q < columns; q++) {
        if (temp[0]) {
          textArr[i][q] = temp[0];
          temp.shift();
        }
      }
    }
    ctx.font = "20px black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "middle";
    ctx.fillText("- Incorrect Letters -", 250, canvas.offsetHeight - 150);
    for (let i = 0; i < textArr.length; i++) {
      for (let q = 0; q < textArr[i].length; q++) {
        if (textArr[i][q]) {
          ctx.fillText(
            textArr[i][q].toUpperCase(),
            250 + q * 35,
            canvas.offsetHeight - 115 + i * 30
          );
        }
      }
    }
    console.log(textArr, this.not);
  }
}
function get(arg) {
  return document.querySelector(arg);
}
window.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && get("#guess").value != "") {
    if (get("#guess").value.split("").length > 1) return;
    if (myGame.not.includes(get("#guess").value.toLowerCase())) return;
    if (
      get(".wordCont")
        .textContent.split(" ")
        .includes(get("#guess").value.toLowerCase())
    )
      return;
    myGame.guess(get("#guess").value.toLowerCase());
    get("#guess").value = "";
  }
});
get("#submitButton").addEventListener("onclick", () => {
  if (get("#guess").value != "") {
    if (get("#guess").value.split("").length > 1) return;
    if (myGame.not.includes(get("#guess").value.toLowerCase())) return;
    if (
      get(".wordCont")
        .textContent.split(" ")
        .includes(get("#guess").value.toLowerCase())
    )
      return;
    myGame.guess(get("#guess").value.toLowerCase());
    get("#guess").value = "";
  }
});
function reset() {
  myGame = null;
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  get(".winText").classList.add("fade-out");
  setTimeout(() => {
    get(".winText").classList.remove("fade-out");
    get(".winText").classList.add("d-none");
    get(".opening-text").classList.remove("d-none");
    get(".graveyard").classList.remove("d-none");
    get(".opening-text").classList.add("fade-in");
    setTimeout(() => {
      get(".opening-text").classList.remove("fade-in");
    }, 500);
  }, 500);
}
