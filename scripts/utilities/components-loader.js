class componentLoader {
  static async loadAll() {
    const components = document.querySelectorAll("[data-load-component]");

    for (const component of components) {
      const path = component.getAttribute("data-load-component");
      await this.loadComponent(path, component);
    }
  }

  static async loadComponent(path, container) {
    try {
      const response = await fetch(`/components/${path}.html`);
      const html = await response.text();

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const template = tempDiv.querySelector("template");
      if (template) {
        const clone = template.content.cloneNode(true);
        container.appendChild(clone);

        const scripts = clone.querySelectorAll("script");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          newScript.textContent = script.textContent;
          document.head.appendChild(newScript);
          document.head.removeChild(newScript);
        });
      }
    } catch (error) {
      console.error("Failed to load component:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  componentLoader.loadAll();
});
