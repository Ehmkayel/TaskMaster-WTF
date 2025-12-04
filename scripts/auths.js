import { AuthModal } from "/components/organisms/AuthModals/authModal.js";
export { Spinner } from "/components/atoms/Spinner/spinner.js";

const handleLogin = async (credentials) => {
  console.log("Login attempt:", credentials);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const handleSignup = async (userData) => {
  console.log("Signup attempt:", userData);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

document.addEventListener("DOMContentLoaded", () => {

  const authModal = new AuthModal({
    activeTab: "login",
    onLogin: handleLogin,
    onSignup: handleSignup,
  });

  authModal.open("#auth-container");

});
