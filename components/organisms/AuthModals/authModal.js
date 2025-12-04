import { LoginForm } from "./loginForm.js";
import { SignupForm } from "./signupForm.js";

export class AuthModal {
  constructor(options = {}) {
    this.activeTab = options.activeTab || "login";
    this.onLogin = options.onLogin || (() => {});
    this.onSignup = options.onSignup || (() => {});
    this.modalId = options.modalId || "authModal";
    this.container = null;
  }

  static renderTabs(activeTab) {
    return `
      <div class="auth-tabs" role="tablist">
        <button 
          class="auth-tab ${activeTab === "login" ? "active" : ""}" 
          data-tab="login"
          role="tab"
          aria-selected="${activeTab === "login"}"
          aria-controls="loginPanel"
        >
          Login
        </button>
        <button 
          class="auth-tab ${activeTab === "signup" ? "active" : ""}" 
          data-tab="signup"
          role="tab"
          aria-selected="${activeTab === "signup"}"
          aria-controls="signupPanel"
        >
          Sign Up
        </button>
        <div class="tab-indicator" style="transform: translateX(${
          activeTab === "login" ? "0" : "100"
        }%);"></div>
      </div>
    `;
  }

  getHeaderContent() {
    if (this.activeTab === "login") {
      return {
        title: "Welcome Back!",
        description: "Enter your details to access your account",
      };
    } else {
      return {
        title: "Join TaskMaster",
        description: "Create an account to boost your productivity",
      };
    }
  }

  render() {
    const { title, description } = this.getHeaderContent();

    return `
      <div class="auth-modal" id="${this.modalId}">
        <div class="modal-header">
          <div class='logo'>
            <img src="/assets/images/welcome-mail.svg" alt='logo'/>
            <div class="badge"></div>
          </div>
          <h2 class="modal-title">${title}</h2>
          <p class="modal-description">${description}</p>
        </div>
        
        <div class="modal-body">
          ${AuthModal.renderTabs(this.activeTab)}
          
          <div class="tab-content">
            <div 
              class="tab-pane ${this.activeTab === "login" ? "active" : ""}" 
              id="loginPanel" 
              role="tabpanel"
              aria-labelledby="loginTab"
            >
              ${LoginForm.render()}
            </div>
            
            <div 
              class="tab-pane ${this.activeTab === "signup" ? "active" : ""}" 
              id="signupPanel" 
              role="tabpanel"
              aria-labelledby="signupTab"
            >
              ${SignupForm.render()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  mount(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Container ${containerSelector} not found`);
      return;
    }

    this.container = container;
    container.innerHTML = this.render();
    this.bindEvents();
    this.initActiveForm();
  }

  bindEvents() {
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      });
    });

    document.addEventListener("click", (e) => {
      const modal = document.getElementById(this.modalId);
      if (modal && e.target === modal) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  initActiveForm() {
    const formContainer =
      this.activeTab === "login"
        ? document.getElementById("loginPanel")
        : document.getElementById("signupPanel");

    if (this.activeTab === "login") {
      LoginForm.init(formContainer, this.onLogin, () =>
        this.switchTab("signup")
      );
    } else {
      SignupForm.init(formContainer, this.onSignup, () =>
        this.switchTab("login")
      );
    }
  }

  switchTab(tabName) {
    if (tabName === this.activeTab) return;

    this.activeTab = tabName;

    const { title, description } = this.getHeaderContent();
    const titleElement = document.querySelector(
      `#${this.modalId} .modal-title`
    );
    const descriptionElement = document.querySelector(
      `#${this.modalId} .modal-description`
    );

    if (titleElement) titleElement.textContent = title;
    if (descriptionElement) descriptionElement.textContent = description;

   
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      const isActive = tab.dataset.tab === tabName;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive);
    });

    const indicator = document.querySelector(".tab-indicator");
    if (indicator) {
      indicator.style.transform = `translateX(${
        tabName === "login" ? "0" : "100"
      }%)`;
    }

    document.querySelectorAll(".tab-pane").forEach((pane) => {
      const isActive = pane.id === `${tabName}Panel`;
      pane.classList.toggle("active", isActive);
      pane.setAttribute("aria-hidden", !isActive);
    });

    this.initActiveForm();
  }

  open(containerSelector = "#auth-container") {
    this.mount(containerSelector);
    document.getElementById(this.modalId)?.classList.add("show");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const firstInput = document.querySelector(
        `#${this.activeTab}Panel .form-input`
      );
      firstInput?.focus();
    }, 100);
  }

  close() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        if (this.container) {
          this.container.innerHTML = "";
        }
      }, 300);
    }
    document.body.style.overflow = "";
  }
}
