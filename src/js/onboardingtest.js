// signup.js

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5r7JcmpnGgv5kyda1IeT5aoZxu3-izVA",
  authDomain: "icmc-official.firebaseapp.com",
  projectId: "icmc-official",
  storageBucket: "icmc-official.appspot.com",
  messagingSenderId: "726759104753",
  appId: "1:726759104753:web:1ec2a07216ecdf70e14950",
  measurementId: "G-HV56YFWRKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Set the default username when the page loads
window.addEventListener('DOMContentLoaded', () => {
  createUserWithEmailAndPassword(auth)
    .then((userCredential) => {
      // User created
      const user = userCredential.user;
      const username = ${user}; // Replace with the desired default username
      document.getElementById('username').textContent = `@${username}`;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error:', errorCode, errorMessage);
      // Show error to the user
    });
})
});
