import { Spinner } from "/components/atoms/Spinner/spinner.js";

export class SignupForm {
  static render() {
    const signupSpinner = new Spinner({
      id: "signupSpinner",
      size: 20,
      color: "white",
      thickness: 2,
      className: "hidden",
    });
    return `
      <form class="signup-form" id="signupForm" data-auth-form="signup">
        <div class="form-group">
         <label htmlFor="password">Full Name<span>*</span></label>
         <div class="form-input">
          <img src="/assets/images/user.svg" alt="User Icon"/>
          <input 
            type="text" 
            id="signupName" 
            name="name" 
            placeholder="John doe" 
            required
            aria-label="Full name"
          >
          </div>
          <div class="error-message" id="signupNameError"></div>
        </div>
        
        <div class="form-group">
           <label htmlFor="email">Email Address<span>*</span></label></label>
        <div class="form-input">
          <img src="/assets/images/mail.svg" alt="Email Icon"/>
          <input 
            type="email" 
            id="signupEmail" 
            name="email" 
            placeholder="hello@example.com" 
            required
            aria-label="Email address"
          >
        </div>
          
          <div class="error-message" id="signupEmailError"></div>
        </div>
        
        <div class="form-group">
        <label htmlFor="password">Password<span>*</span></label>
          <div class="form-input">
            <img src="/assets/images/lock.svg" alt="Lock Icon"/>
              <input 
                type="password" 
                id="signupPassword" 
                name="password" 
                placeholder="******" 
                required
                  minlength="6"
                aria-label="Password"
              >
          </div>
       
          <div class="error-message" id="signupPasswordError"></div>
          <small class="hint">Password must be at least 6 characters long</small>
        </div>
        
       <div class="cta-btn">
          <button class="btn btn-default btn-block">
            <img src="/assets/images/help.svg" alt="Help Icon"/>
            <span class="btn-text">Help?</span>
          </button>
          <button type="submit" class="btn btn-primary btn-block" id="signupSubmit">
          <span class="btn-text">Create Account</span>
          ${signupSpinner.render()}
        </button>
        </div>
        
        <div class="form-footer">
         <p class="form-switch">By continuing, you agree to our <a href="#" class="switch-link">Terms of Service</a> & <a href="#" class="switch-link">Privacy Policy</a></p>
         
        </div>
        
       
      </form>
    `;
  }

  static init(container, onSignupSubmit, onSwitchToLogin) {
    const form = container.querySelector("#signupForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      if (
        !this.validateForm({
          name,
          email,
          password,
        })
      ) {
        return;
      }

      const submitBtn = document.getElementById("signupSubmit");
      const btnText = submitBtn.querySelector(".btn-text");
      const spinner = document.getElementById("signupSpinner");

      btnText.textContent = "Creating account...";
      spinner.show("signupSpinner");
      submitBtn.disabled = true;

      try {
        await onSignupSubmit({ name, email, password });
      } catch (error) {
        this.showError("signupEmailError", error.message || "Signup failed");
      } finally {
        btnText.textContent = "Create Account";
        spinner.hide("signupSpinner");
        submitBtn.disabled = false;
      }
    });

    this.setupRealTimeValidation();
  }

  static validateForm(data) {
    this.clearErrors();
    let isValid = true;

    if (!data.name.trim()) {
      this.showError("signupNameError", "Name is required");
      isValid = false;
    }

    if (!data.email.trim()) {
      this.showError("signupEmailError", "Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      this.showError("signupEmailError", "Invalid email format");
      isValid = false;
    }

    if (data.password.length < 6) {
      this.showError(
        "signupPasswordError",
        "Password must be at least 6 characters"
      );
      isValid = false;
    }

    return isValid;
  }

  static setupRealTimeValidation() {
    const password = document.getElementById("signupPassword");
  }

  static showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
    }
  }

  static clearError(fieldId) {
    const errorEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }
  }

  static clearErrors() {
    const errors = document.querySelectorAll(".signup-form .error-message");
    errors.forEach((error) => {
      error.textContent = "";
      error.classList.remove("show");
    });
  }
}
