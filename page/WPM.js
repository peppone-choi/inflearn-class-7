let wpmSingleton = null;

export class WPM {
  constructor(wpmContainer) {
    if (wpmSingleton) {
      return new Error("WPM container already exists");
    }
    wpmSingleton = this;
    this.wpm = 0;
    this.wpmContainer = wpmContainer;
    this.wpmContainer.classList.add("nes-container");
    this.wpmContainer.classList.add("is-dark");
    this.wpmContainer.classList.add("time-container");
    this.wpmContainer.classList.add("wpm-container");
    this.wpmContainer.style.display = "block";
    this.wpmContainer.style.textAlign = "center";
    this.wpmContainer.style.margin = "2rem auto";
  }

  calculateWPM(totalWords, time) {
    this.wpm = (totalWords / time) * 60;
    this.wpm = this.wpm.toFixed(2);
  }

  render(none) {
    this.wpmContainer.style.display = none ? "none" : "block";
    this.wpmContainer.textContent = `WPM: ${this.wpm}`;
    return this.wpmContainer;
  }
}
