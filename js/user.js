// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------------------
// USER AUTH CHECK
// ------------------------------
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html"; // pas connecté → login
        return;
    }

    // Affiche le nom ou email
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.exists() ? userDoc.data().username || user.email : user.email;

    document.getElementById("welcome").textContent = "Bonjour, " + username;

    chargerItineraires(user.uid);
});

// ------------------------------
// CHARGEMENT DES ITINÉRAIRES
// ------------------------------
async function chargerItineraires(uid) {
    const list = document.getElementById("itineraire-list");
    list.innerHTML = "Chargement...";

    const itinRef = collection(db, "users", uid, "itineraires");
    const snap = await getDocs(itinRef);

    if (snap.empty) {
        list.innerHTML = "<p>Aucun itinéraire pour le moment.</p>";
        return;
    }

    list.innerHTML = "";

    snap.forEach(docItem => {
        const data = docItem.data();

        const card = document.createElement("div");
        card.classList.add("itineraire-card");

        card.innerHTML = `
            <h3>${data.titre}</h3>
            <p>${data.description}</p>
            <button onclick="window.location.href='itineraire.html?id=${docItem.id}'">Voir l’itinéraire</button>
        `;

        list.appendChild(card);
    });
}

// ------------------------------
// LOGOUT
// ------------------------------
document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});
