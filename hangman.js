function start(mode) {}
function modeButtons() {
  document.querySelector(".button").classList.add("d-none");
  document
    .querySelector(".d-flex.justify-content-center.d-none")
    .classList.remove("d-none");
}

class Game {
  word;
  mode;
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
  guess(arg) {}
}

/*document.querySelector(".opening-card").classList.add("open-card-anim");
  setTimeout(
    () => {
      document
        .querySelector(".opening-card")
        .classList.add("open-card-anim-done");
    },
    5000,
    document
  ); */
