// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  setPersistence, 
  browserSessionPersistence, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// --- Config Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyBQMZvA5-qh18IF3g_OsxBgGUuz0NrXQfw",
  authDomain: "evasia-3350f.firebaseapp.com",
  projectId: "evasia-3350f",
  storageBucket: "evasia-3350f.firebasestorage.app",
  messagingSenderId: "895340212560",
  appId: "1:895340212560:web:bccdb5f341a4705a0f7c55",
  measurementId: "G-V3FMPJ6JG3"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Masquer le body tant que l'utilisateur n'est pas validé ---
document.body.style.display = "none";

// --- Sélecteurs DOM ---
const navLinks = document.querySelector(".nav_links");
const welcomeDiv = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logout");

// --- Forcer session en mémoire et vérifier l'état de connexion ---
setPersistence(auth, browserSessionPersistence).then(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Non connecté → redirection vers login
      window.location.href = "login.html";
      return;
    }

    // Connecté → afficher le body
    document.body.style.display = "block";

    // Afficher message de bienvenue
    welcomeDiv.innerText = `Bonjour, ${user.email}`;

    // Charger les infos Firestore pour déterminer le rôle
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) throw new Error("Document utilisateur introuvable");

      const userData = userDoc.data();

      // Si admin, ajouter le lien vers le panel admin
      if (userData.role === "admin") {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "admin.html";
        a.textContent = "Panel Admin";
        li.appendChild(a);
        navLinks.appendChild(li);
      }
    } catch (error) {
      console.error("Erreur récupération utilisateur :", error);
      welcomeDiv.innerText = "Impossible de charger vos informations.";
    }
  });
});

// --- Logout ---
logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await signOut(auth);
  window.location.href = "login.html";
});
