// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase config
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
const db = getFirestore(app);

const joursContainer = document.getElementById("jours-container");

// Vérifie si l'utilisateur est connecté
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html"; // redirige si pas connecté
    return;
  }

  // Récupère l'itinéraire Firestore
  try {
    const itineraireRef = doc(db, "users", user.uid, "itineraires", "LYwxpVhtGFvJ0QGd5KAe"); // id du doc
    const itineraireSnap = await getDoc(itineraireRef);

    if (!itineraireSnap.exists()) {
      joursContainer.innerHTML = "<p>Aucun itinéraire trouvé.</p>";
      return;
    }

    const itineraire = itineraireSnap.data();

    // Injecte le titre
    const titleEl = document.createElement("h2");
    titleEl.textContent = itineraire.titre;
    joursContainer.appendChild(titleEl);

    // Crée une carte pour chaque jour
    for (let i = 1; i <= itineraire.nbJours; i++) {
      const jourKey = "jour" + i;
      const jourEl = document.createElement("div");
      jourEl.classList.add("jour-card");
      jourEl.innerHTML = `
        <h3>Jour ${i}</h3>
        <p>${itineraire.jours[jourKey]}</p>
      `;
      joursContainer.appendChild(jourEl);
    }
  } catch (err) {
    console.error(err);
    joursContainer.innerHTML = "<p>Erreur lors du chargement de l'itinéraire.</p>";
  }
});
