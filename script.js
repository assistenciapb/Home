document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "123456";

  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("error-msg");
  const loginScreen = document.getElementById("login-screen");
  const mainContent = document.getElementById("main-content");
  const logoutBtn = document.getElementById("logout-btn");

  // Exibe erro com shake
  function showError(message) {
    errorMsg.textContent = message;
    passwordInput.value = "";
    passwordInput.focus();

    loginScreen.classList.add("shake");
    setTimeout(() => {
      loginScreen.classList.remove("shake");
      errorMsg.textContent = "";
    }, 1500);
  }

  // Libera acesso
  function unlockContent() {
    loginScreen.style.display = "none";
    mainContent.classList.remove("hidden");
    localStorage.setItem("isLoggedIn", "true");
  }

  // Logout
  function logout() {
    localStorage.removeItem("isLoggedIn");
    mainContent.classList.add("hidden");
    loginScreen.style.display = "flex";
    passwordInput.value = "";
  }

  // Login
  function login() {
    const input = passwordInput.value.trim();
    if (input === correctPassword) {
      unlockContent();
    } else {
      showError("Senha incorreta! Tente novamente.");
    }
  }

  // Eventos
  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);
  passwordInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") login();
  });

  // Verificação ao carregar
  if (localStorage.getItem("isLoggedIn") === "true") {
    unlockContent();
  } else {
    loginScreen.style.display = "flex";
    mainContent.classList.add("hidden");
  }
});
