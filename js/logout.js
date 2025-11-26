import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const auth = getAuth();
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // empêche la redirection HTML par défaut

  try {
    await signOut(auth); // déconnecte l'utilisateur
    alert("Vous êtes bien déconnecté !");
    window.location.href = "login.html"; // redirection après logout
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    alert("Impossible de se déconnecter, réessayez.");
  }
});
