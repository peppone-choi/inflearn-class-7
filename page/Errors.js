let errorSingleton = null;

export class Errors {
  constructor(errorsContainer) {
    if (errorSingleton) {
      return new Error("Error container already exists");
    }
    errorSingleton = this;
    this.errorCnt = 0;
    this.errorsContainer = errorsContainer;
    this.errorsContainer.classList.add("nes-container");
    this.errorsContainer.classList.add("is-dark");
    this.errorsContainer.classList.add("time-container");
    this.errorsContainer.classList.add("errors-container");
    this.errorsContainer.style.display = "block";
    this.errorsContainer.style.textAlign = "center";
    this.errorsContainer.style.margin = "2rem auto";
  }

  setError(error) {
    this.errorCnt = error;
  }

  getErrors() {
    return this.errorCnt;
  }

  render() {
    this.errorsContainer.textContent = `Errors: ${this.errorCnt}`;
    return this.errorsContainer;
  }
}
