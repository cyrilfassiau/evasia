// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// --- Firebase config ---
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

// --- Vérifier que l'admin est connecté ---
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html"; // redirection si non connecté
  }
});

// --- Sélecteur utilisateur ---
const userSelect = document.getElementById("user-select");

// Charger tous les utilisateurs pour le select
async function loadUsers() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    usersSnapshot.forEach((docSnap) => {
      const userData = docSnap.data();
      const option = document.createElement("option");
      option.value = docSnap.id; // UID
      option.textContent = userData.username || userData.email; // afficher username si existant
      userSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
    alert("Impossible de charger les utilisateurs");
  }
}
loadUsers();

// --- Génération automatique des champs "jours" ---
const nbJoursInput = document.getElementById("nbJours");
const joursContainer = document.getElementById("jours-container");

nbJoursInput.addEventListener("input", () => {
  const nb = parseInt(nbJoursInput.value);
  joursContainer.innerHTML = ""; // réinitialiser le container
  if (isNaN(nb) || nb <= 0) return;

  for (let i = 1; i <= nb; i++) {
    const div = document.createElement("div");
    div.className = "jour-input";
    div.innerHTML = `
      <label for="jour${i}">Jour ${i} :</label>
      <input type="text" id="jour${i}" placeholder="Description du jour ${i}" required />
    `;
    joursContainer.appendChild(div);
  }
});

// --- Formulaire d'ajout d'itinéraire ---
const form = document.getElementById("itineraire-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const targetUid = userSelect.value;
  const titre = document.getElementById("titre").value.trim();
  const nbJours = parseInt(document.getElementById("nbJours").value);
  const description = document.getElementById("description").value.trim();

  if (!targetUid || !titre || !nbJours || !description) {
    alert("Merci de remplir tous les champs");
    return;
  }

  // Collecter les journées dynamiquement
  const jours = {};
  for (let i = 1; i <= nbJours; i++) {
    const jourValue = document.getElementById(`jour${i}`).value.trim();
    jours[`jour${i}`] = jourValue || "";
  }

  // Créer l'itinéraire dans Firestore
  try {
    const itineraireRef = doc(db, "users", targetUid, "itineraires", `${titre}-${Date.now()}`);
    await setDoc(itineraireRef, {
      titre,
      nbJours,
      description,
      jours,
      createdAt: new Date().toISOString()
    });

    alert("Itinéraire créé avec succès !");
    form.reset();
    joursContainer.innerHTML = ""; // vider les champs jours
  } catch (error) {
    console.error("Erreur lors de la création de l'itinéraire :", error);
    alert("Erreur lors de la création de l'itinéraire");
  }
});
