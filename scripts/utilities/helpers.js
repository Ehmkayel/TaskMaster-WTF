export function closeAuthModal() {
  const modal = document.querySelector(".auth-modal");
  const container = document.getElementById("auth-container");
  if (modal) modal.classList.remove("show");
  if (container) container.innerHTML = "";
  document.body.style.overflow = "";
}

export function showSignupSuccessMessage() {
  const container = document.getElementById("auth-container");
  if (container) {
    container.innerHTML = `
      <div class="success-message" style="
        background: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        margin: 0 auto;
      ">
        <h2>🎉 Check Your Email!</h2>
        <p>We've sent a confirmation link to your email address.</p>
        <p>Please click the link to verify your account.</p>
        <button onclick="window.location.href='/'" style="
          margin-top: 20px;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        ">
          Back to Home
        </button>
      </div>
    `;
  }
}
