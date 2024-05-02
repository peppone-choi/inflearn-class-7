import { WPM } from "./WPM.js";
import { CPM } from "./CPM.js";
import { Errors } from "./Errors.js";
import { Timer } from "./Timer.js";
import { Accuracy } from "./Accuracy.js";
import { Text } from "./Text.js";
import { Input } from "./Input.js";

const mainContainer = document.querySelector(".main-container");
const header = document.createElement("header");
const h1 = document.createElement("h1");
const scoreContainer = document.createElement("div");
const textContainer = document.createElement("div");
const errorsContainer = document.createElement("div");
const timeContainer = document.createElement("div");
const accuracyContainer = document.createElement("div");
const inputContainer = document.createElement("div");
const wpmContainer = document.createElement("div");
const cpmContainer = document.createElement("div");
const resetButton = document.createElement("button");
const time = 360;

const errors = new Errors(errorsContainer);
const timer = new Timer(timeContainer, time);
const accuracy = new Accuracy(accuracyContainer);
const text = new Text(textContainer);
const input = new Input(inputContainer);
const wpms = new WPM(wpmContainer);
const cpms = new CPM(cpmContainer);

let textIdx = 0;
let start = false;
let errorSum = 0;
let wordSum = 0;
let charSum = 0;
let charColor = [];

const textContent = [
  `I have a dream that one day this nation will rise up and live out the true meaning of its creed`,

  `"We hold these truths to be self-evident: that all men are created equal."`,

  `I have a dream that one day on the red hills of Georgia the sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood.`,

  `I have a dream that one day even the state of Mississippi,`,

  `a state sweltering with the heat of injustice, sweltering with the heat of oppression,`,

  `will be transformed into an oasis of freedom and justice.`,

  `I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin,`,

  `but by the content of their character.`,

  `I have a dream today.`,

  `I have a dream that one day, down in Alabama, with its vicious racists, with its governor having his lips dripping with the words of interposition and nullification;`,

  `one day right there in Alabama, little black boys and black girls will be able to join hands with little white boys and white girls as sisters and brothers.`,

  `I have a dream today.`,

  `I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain,`,

  `and the crooked places will be made straight, and the glory of the Lord shall be revealed, and all flesh shall see it together.`,

  `This is our hope. This is the faith that I go back to the South with. With this faith we will be able to hew out of the mountain of despair a stone of hope.`,

  `With this faith we will be able to transform the jangling discords of our nation into a beautiful symphony of brotherhood.`,

  `With this faith we will be able to work together, to pray together, to struggle together, to go to jail together, to stand up for freedom together, knowing that we will be free one day.`,

  `This will be the day when all of God's children will be able to sing with a new meaning,`,

  `"My country, 'tis of thee, sweet land of liberty, of thee I sing. Land where my fathers died, land of the pilgrim's pride, from every mountainside, let freedom ring."`,
];

const textAllLength = textContent.join("").length;

function checkInput(text, input) {
  const now = input.getText().split("");
  const textWords = text.getTextWords();
  const inputWords = input.getInputWords(text.text);
  const textChars = text.getTextChars();
  const inputChars = input.getInputChars(text.text);
  let errorCnt = 0;
  let correctCnt = 0;
  let correctWordsCnt = 0;
  console.log(textChars, inputChars);
  textChars.forEach((char, index) => {
    if (inputChars[index] !== " " && char !== inputChars[index]) {
      charColor[index] = "red";
      errorCnt++;
    } else if (inputChars[index] !== " ") {
      charColor[index] = "green";
      correctCnt++;
    } else if (now[index] === " " && char !== " ") {
      charColor[index] = "red";
      errorCnt++;
    } else {
      charColor[index] = "white";
    }
  });
  text.render(charColor);
  errors.setError(errorSum + errorCnt);
  charSum = correctCnt;

  textWords.forEach((word, index) => {
    if (inputChars[index] !== " " && word == inputWords[index]) {
      correctWordsCnt++;
    }
  });
  wordSum = correctWordsCnt;

  errors.render();
  accuracy.calculateAccuracy(textAllLength, errorSum + errorCnt);
  wpms.calculateWPM(wordSum, time);
  cpms.calculateCPM(charSum, time);
  accuracy.render();
  wpms.render(true);
  cpms.render(true);
}

h1.textContent = "Typing Speed Test";
h1.style.textAlign = "center";
h1.style.fontSize = "5rem";

text.setText(textContent[textIdx]);
text.render(charColor);
input.render();
input.input.addEventListener("input", () => {
  if (input.getInputValue().length > text.getText().length) {
    errorSum = errors.getErrors();
    charSum += input.getInputValue().length;
    wordSum += input.getInputValue().split(" ").length;
    errors.setError(errorSum + 1);
    textIdx++;
    text.setText(textContent[textIdx]);
    text.render(charColor);
    input.clearInput();
  }
  if (!start) {
    start = true;
    timer.startTimer();
  }
  setTimeout(() => {
    if (timer.getTime() === 0) {
      timeOut();
    }
  }, time * 1000);
  text.render(charColor);
  input.setInputValue(input.getInputValue());
  checkInput(text, input);
});

const timeOut = () => {
  timer.stopTimer();
  input.input.disabled = true;
  input.input.placeholder = "Time is up!";
  errors.render();
  accuracy.render();
  wpms.render(false);
  cpms.render(false);
  resetButton.style.display = "block";
};

const reset = () => {
  timer.resetTimer(time);
  timer.render();
  input.clearInput();
  input.input.disabled = false;
  input.input.placeholder = "Start typing here...";
  textIdx = 0;
  text.setText(textContent[textIdx]);
  text.render(charColor);
  errorSum = 0;
  charSum = 0;
  wordSum = 0;
  errors.setError(0);
  errors.render();
  accuracy.render();
  wpms.render(true);
  cpms.render(true);
  resetButton.style.display = "none";
  start = false;
};

header.appendChild(h1);
mainContainer.appendChild(header);
mainContainer.appendChild(scoreContainer);
scoreContainer.style.display = "flex";
scoreContainer.appendChild(wpms.render(true));
scoreContainer.appendChild(cpms.render(true));
scoreContainer.appendChild(errors.render());
scoreContainer.appendChild(timer.render());
scoreContainer.appendChild(accuracy.render());
mainContainer.appendChild(text.render(charColor));
mainContainer.appendChild(input.render());
mainContainer.appendChild(resetButton);
resetButton.textContent = "Reset";
resetButton.style.display = "none";
resetButton.style.margin = "2rem auto";
resetButton.style.width = "10rem";
resetButton.style.height = "3rem";
resetButton.style.fontSize = "1.5rem";
resetButton.addEventListener("click", () => {
  reset();
});
