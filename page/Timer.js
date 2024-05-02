let timerSingleton = null;

export class Timer {
  constructor(timeContainer, startTime) {
    if (timerSingleton) {
      return new Error("Timer already exists");
    }
    timerSingleton = this;
    this.timeContainer = timeContainer;
    this.timeContainer.classList.add("nes-container");
    this.timeContainer.classList.add("is-dark");
    this.timeContainer.classList.add("time-container");
    this.timeContainer.style.display = "block";
    this.timeContainer.style.textAlign = "center";
    this.timeContainer.style.margin = "2rem auto";
    this.time = startTime;
    this.interval = null;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time--;
      this.render();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  resetTimer(startTime) {
    this.time = startTime;
  }

  getTime() {
    return this.time;
  }

  render() {
    this.timeContainer.textContent = `Time: ${this.time} sec`;
    return this.timeContainer;
  }
}
