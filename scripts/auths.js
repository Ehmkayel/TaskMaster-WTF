import { AuthModal } from "/components/organisms/AuthModals/authModal.js";
export { Spinner } from "/components/atoms/Spinner/spinner.js";
import { supabase } from "./utilities/superbase-client.js";
import { closeAuthModal } from "./utilities/helpers.js";

const handleLogin = async (credentials) => {
  console.log("Login attempt:", credentials);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    console.log("Login successful:", data.user);
    closeAuthModal();
    navigateToDashboard();
    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message || "Login failed");
  }
};

const handleSignup = async (userData) => {
  console.log("Signup attempt:", userData);
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
        },
      },
    });

    if (error) throw error;

    console.log("Signup successful:", data.user);
    closeAuthModal();
    navigateToDashboard();
    return data;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw new Error(error.message || "Signup failed");
  }
};

function navigateToDashboard() {
  console.log("Redirecting to dashboard...");

  setTimeout(() => {
    window.location.href = "/pages/dashboard.html";
  }, 500);

}

const checkAuthStatus = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    console.log("User already logged in:", session.user);
    return session.user;
  }
  return null;
};

supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth state changed:", event, session?.user?.email);

  switch (event) {
    case "SIGNED_IN":
      console.log("User signed in!");
       closeAuthModal();
       navigateToDashboard();
      break;

    case "SIGNED_OUT":
      console.log("User signed out!");
      break;

    case "USER_UPDATED":
      console.log("User updated!");
      break;

    case "TOKEN_REFRESHED":
      console.log("Token refreshed!");
      break;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuthStatus();
  if (user) {
    return
  }
  const authModal = new AuthModal({
    activeTab: "login",
    onLogin: handleLogin,
    onSignup: handleSignup,
  });

  authModal.open("#auth-container");
});
