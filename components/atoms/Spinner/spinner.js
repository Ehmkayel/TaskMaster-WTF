export class Spinner {
  constructor(options = {}) {
    this.size = options.size || 20;
    this.color = options.color || "#007bff";
    this.thickness = options.thickness || 2;
    this.className = options.className || "";
    this.id = options.id || "";
  }

  render() {
    return `
      <div class="spinner ${this.className}" 
        ${this.id ? `id="${this.id}"` : ""}
        style="
          width: ${this.size}px;
          height: ${this.size}px;
          border: ${this.thickness}px solid rgba(255, 255, 255, 0.3);
          border-top-color: ${this.color};
      ">
      </div>
    `;
  }

  static show(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
      spinner.classList.remove("hidden");
    }
  }

  static hide(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
      spinner.classList.add("hidden");
    }
  }

  static createAndMount(options, containerSelector) {
    const spinner = new Spinner(options);
    const container = document.querySelector(containerSelector);
    if (container) {
      container.innerHTML = spinner.render();
    }
    return spinner;
  }
}
