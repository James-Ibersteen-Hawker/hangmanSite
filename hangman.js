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
function start(mode) {
  document.querySelector(".opening-text").classList.add("d-none");
  document.querySelector(".opening-card").classList.add("open-card-anim");
  setTimeout(
    () => {
      document
        .querySelector(".opening-card")
        .classList.add("open-card-anim-done");
      document.getElementsByTagName("STYLE")[0].append(`
        .openedCard::after, .openedCard::before {
        width: ${document.querySelector(".opening-card").offsetWidth * 1.8}px;
        height: ${document.querySelector(".opening-card").offsetHeight * 2.5}px;
        transform: scaleX(1) scaleY(0);
        }  
      `);
      document.querySelector(".opening-card").classList.add(".openedCard");
      document
        .querySelector(".opening-card")
        .classList.remove(".open-card-anim");
    },
    4000,
    document
  );
  ///////////////
  let selection = words.filter((val) => {
    if (mode == 1) return val.length <= 5;
    if (mode == 2) return val.length > 5 && val.length <= 7;
    if (mode == 3) return val.length > 7 && val.length <= 10;
    if (mode == 4) return val.length > 10;
  });
  let game = new Game(Math.floor(Math.random() * selection.length));
}
function modeButtons() {
  document.querySelector(".button").classList.add("d-none");
  document
    .querySelector(".d-flex.justify-content-center.d-none")
    .classList.remove("d-none");
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
    let container = document.querySelector(".wordCont");
    for (let i = 0; i < this.word.length; i++) {
      let div = document.createElement("div");
      div.id = `letter_${i}`;
      container.append(div);
    }
  }
  guess(arg) {
    if (this.word.includes(arg)) {
      this.word.forEach((val, ind) => {
        document.querySelector(`#letter_${ind}`).textContent = val;
      });
    }
  }
}
