let accuracySingleton = null;

export class Accuracy {
  constructor(accuracyContainer) {
    if (accuracySingleton) {
      return new Error("Accuracy container already exists");
    }
    accuracySingleton = this;
    this.accuracy = 0;
    this.accuracyContainer = accuracyContainer;
    this.accuracyContainer.classList.add("nes-container");
    this.accuracyContainer.classList.add("is-dark");
    this.accuracyContainer.classList.add("time-container");
    this.accuracyContainer.classList.add("accuracy-container");
    this.accuracyContainer.style.display = "block";
    this.accuracyContainer.style.textAlign = "center";
    this.accuracyContainer.style.margin = "2rem auto";
  }

  calculateAccuracy(totalChars, errors) {
    this.accuracy = ((totalChars - errors) / totalChars) * 100;
    this.accuracy = this.accuracy.toFixed(2);
  }

  render() {
    this.accuracyContainer.textContent = `Accuracy: ${this.accuracy}%`;
    return this.accuracyContainer;
  }
}
