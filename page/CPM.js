let cpmSingleton = null;

export class CPM {
  constructor(cpmContainer) {
    if (cpmSingleton) {
      return new Error("CPM container already exists");
    }
    cpmSingleton = this;
    this.cpm = 0;
    this.cpmContainer = cpmContainer;
    this.cpmContainer.classList.add("nes-container");
    this.cpmContainer.classList.add("is-dark");
    this.cpmContainer.classList.add("time-container");
    this.cpmContainer.classList.add("cpm-container");
    this.cpmContainer.style.display = "block";
    this.cpmContainer.style.textAlign = "center";
    this.cpmContainer.style.margin = "2rem auto";
  }

  calculateCPM(totalChars, time) {
    this.cpm = (totalChars / time) * 60;
    this.cpm = this.cpm.toFixed(2);
  }

  render(none) {
    this.cpmContainer.style.display = none ? "none" : "block";
    this.cpmContainer.textContent = `CPM: ${this.cpm}`;
    return this.cpmContainer;
  }
}
