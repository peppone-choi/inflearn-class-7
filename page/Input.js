let inputSingleton = null;

export class Input {
  constructor(inputContainer) {
    if (inputSingleton) {
      return new Error("Input container already exists");
    }
    this.input = document.createElement("textarea");
    this.inputContainer = inputContainer;
    this.inputContainer.classList.add("input-container");
    this.inputContainer.style.display = "block";
    this.inputContainer.style.textAlign = "center";
    this.inputContainer.style.marginTop = "2rem";
    this.input.className = "nes-textarea";
    this.input.style.width = "100%";
    this.input.style.fontSize = "2rem";
    this.input.style.textAlign = "center";
    this.input.style.margin = "2rem auto";
    this.input.placeholder = "Start typing here...";
    this.inputContainer.appendChild(this.input);
  }

  getText() {
    return this.input.value;
  }

  setInputValue(value) {
    this.input.value = value;
  }

  getInputValue() {
    return this.input.value;
  }

  getInputWords(text) {
    let arr = text.split(" ").fill(" ");
    this.input.value.split(" ").forEach((word, index) => {
      arr[index] = word;
    });
    return arr;
  }

  getInputChars(text) {
    let arr = text.split("").fill(" ");
    this.input.value.split("").forEach((char, index) => {
      arr[index] = char;
    });
    return arr;
  }

  clearInput() {
    this.input.value = "";
  }

  render() {
    return this.inputContainer;
  }
}
