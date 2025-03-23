"use strict";
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
  "Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu",
  "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch",
  "Chargoggaggoggmanchauggaggoggcharbunugungamaugg",
  "Pneumonoultramicroscopicsilicovolcanoconiosis",
  "Hippopotomonstrosesquipedaliaphobia", //everything else
];
let myGame;
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
  myGame = new Game(words[Math.floor(Math.random() * selection.length)]);
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
  }
  init() {
    let container = get(".wordCont");
    for (let i = 0; i < this.word.length; i++) {
      let div = document.createElement("div");
      div.id = `letter_${i}`;
      div.textContent = " _ ";
      container.append(div);
    }
  }
  guess(arg) {
    if (this.word.includes(arg)) {
      this.word.forEach((val, ind) => {
        get(`#letter_${ind}`).textContent = val;
      });
    }
  }
}
function get(arg) {
  return document.querySelector(arg);
}
window.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && get(".guess").value != " ") {
    myGame.guess(get(".guess").value.toLowerCase());
  }
});
