import { Spinner } from "/components/atoms/Spinner/spinner.js";

export class LoginForm {
  static render() {
    const loginSpinner = new Spinner({
      id: "loginSpinner",
      size: 20,
      color: "white",
      thickness: 2,
      className: "hidden",
    });
    return `
      <form class="login-form" id="loginForm" data-auth-form="login">
        <div class="form-group">
        <label htmlFor="email">Email Address<span>*</span></label></label>
        <div class="form-input">
          <img src="/assets/images/mail.svg" alt="Email Icon"/>
          <input 
            type="email" 
            id="loginEmail" 
            name="email" 
            placeholder="hello@example.com" 
            required
            aria-label="Email address"
          >
        </div>
        <div class="error-message" id="loginEmailError"></div>
        </div>
        
        <div class="form-group">
          <label htmlFor="password">Password<span>*</span></label>
          <div class="form-input">
            <img src="/assets/images/lock.svg" alt="Lock Icon"/>
              <input 
                type="password" 
                id="loginPassword" 
                name="password" 
                placeholder="******" 
                required
                aria-label="Password"
              >
          </div>
         
          <div class="error-message" id="loginPasswordError"></div>
        </div>
       
        <div class="cta-btn">
          <button class="btn btn-default btn-block">
            <img src="/assets/images/help.svg" alt="Help Icon"/>
            <span class="btn-text">Help?</span>
          </button>
          <button type="submit" class="btn btn-primary btn-block" id="loginSubmit">
            <span class="btn-text">Next Step</span>
             ${loginSpinner.render()}
          </button>
        </div>
        
        
        <div class="form-footer">
         <p class="form-switch">By continuing, you agree to our <a href="#" class="switch-link">Terms of Service</a> & <a href="#" class="switch-link">Privacy Policy</a></p>
         
        </div>
      </form>
    `;
  }

  static init(container, onLoginSubmit, onSwitchToSignup) {
    const form = container.querySelector("#loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const submitBtn = document.getElementById("loginSubmit");
      const btnText = submitBtn.querySelector(".btn-text");

      btnText.textContent = "Logging in...";
      Spinner.show("loginSpinner");
      submitBtn.disabled = true;

      this.clearErrors();

      try {
        await onLoginSubmit({ email, password });
      } catch (error) {
        this.showError("loginEmailError", error.message || "Login failed");
      } finally {
        btnText.textContent = "Login";
        Spinner.hide("loginSpinner");
        submitBtn.disabled = false;
      }
    });
  }

  static showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
    }
  }

  static clearErrors() {
    const errors = document.querySelectorAll(".login-form .error-message");
    errors.forEach((error) => {
      error.textContent = "";
      error.classList.remove("show");
    });
  }
}
