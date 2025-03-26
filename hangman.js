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
      get(".opening-card").classList.remove(".open-card-anim");
      get(".gameText").classList.remove("d-none");
      get(".gameText").classList.add("fade-in");
      setTimeout(() => {
        get(".gameText").classList.remove("fade-in");
      }, 500);
    },
    4000,
    document
  );
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
  myGame = new Game(selection[Math.floor(Math.random() * selection.length)], 0);
  myGame.init();
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
  #stage;
  constructor(word, mode) {
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
  }
  get stage() {
    return this.#stage;
  }
  stageIncr() {
    let cS = this.#stage;
  }
  init() {
    let container = get(".wordCont");
    this.slots = new Array(this.word.length);
    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i] = "_";
    }
    container.textContent = this.slots.join(" ");
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
    }
    if (this.slots.join("") == this.word.join("")) {
      get(".wordCont").classList.add("fade-out");
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
        },
        500,
        this
      );
    }
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
let myCurve = bezier(
  20,
  5,
  ctx,
  { x: 0, y: 0 },
  { x: 400, y: 0 },
  { x: 400, y: 400 }
);
myCurve.draw(0, 2, "blue");
