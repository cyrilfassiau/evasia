// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



// ============================
//         MODALE
// ============================

function openModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
  window.location.href = "login.html"; // redirection après fermeture modale
});



// ============================
//   SIGNUP (Create account)
// ============================

const signupBtn = document.getElementById("submit");

signupBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    openModal("Merci de remplir tous les champs.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      createdAt: new Date(),
      role: "user"
    });

    // 🎉 Affiche modale de succès
    openModal("Compte créé avec succès !");

  } catch (error) {
    openModal(error.message);
  }
});



// ============================
//       LOGIN (Connect)
// ============================

const loginBtn = document.getElementById("connect");

loginBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  if (!email || !password) {
    openModal("Merci de remplir tous les champs.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "connected.html"; 

  } catch (error) {
    openModal(error.message);
  }
});
