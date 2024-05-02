let textSingleton = null;

export class Text {
  constructor(textContainer) {
    if (textSingleton) {
      return new Error("Text container already exists");
    }
    this.textContainer = textContainer;
    this.textContainer.classList.add("text-container");
    this.textContainer.style.display = "block";
    this.textContainer.style.textAlign = "center";
    this.textContainer.style.marginTop = "2rem";
    this.text = "";
  }

  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }

  getTextWords() {
    return this.text.split(" ");
  }

  getTextChars() {
    return this.text.split("");
  }

  render(charColor) {
    this.textContainer.innerHTML = "";
    if (charColor.length === 0) {
      charColor = this.text.split("").map(() => "white");
    }
    this.text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.color = charColor[index];
      this.textContainer.appendChild(span);
    });
    return this.textContainer;
  }
}
