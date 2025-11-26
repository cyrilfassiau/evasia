import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQMZvA5-qh18IF3g_OsxBgGUuz0NrXQfw",
  authDomain: "evasia-3350f.firebaseapp.com",
  projectId: "evasia-3350f",
  storageBucket: "evasia-3350f.firebasestorage.app",
  messagingSenderId: "895340212560",
  appId: "1:895340212560:web:bccdb5f341a4705a0f7c55",
  measurementId: "G-V3FMPJ6JG3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Masquer le body jusqu’à validation de la session
document.body.style.display = "none";

// Forcer session en mémoire
setPersistence(auth, browserSessionPersistence).then(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Pas connecté → redirection
      window.location.href = "login.html";
    } else {
      // Afficher la page
      document.body.style.display = "block";

      // Message personnalisé
      const welcomeDiv = document.getElementById("welcomeMessage");
      welcomeDiv.innerText = `Bonjour, ${user.email}`;
    }
  });
});
