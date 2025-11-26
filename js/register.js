// Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyBQMZvA5-qh18IF3g_OsxBgGUuz0NrXQfw",

    authDomain: "evasia-3350f.firebaseapp.com",

    projectId: "evasia-3350f",

    storageBucket: "evasia-3350f.firebasestorage.app",

    messagingSenderId: "895340212560",

    appId: "1:895340212560:web:bccdb5f341a4705a0f7c55",

    measurementId: "G-V3FMPJ6JG3"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);



const submit = document.getElementById('submit');
submit.addEventListener("click",function(event){
event.preventDefault()
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert('creating account')
    window.location.href = "login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  

})
const connect = document.getElementById('connect');
connect.addEventListener("click",function(event){
event.preventDefault()
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "connected.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
  

})

