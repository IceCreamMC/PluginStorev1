// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your Firebase configuration
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
const auth = getAuth(app);

// Function to set cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Cookie expiry time
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Handle login form submission
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent traditional form submission

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store Auth token in cookies
      user.getIdToken().then((token) => {
        setCookie('authToken', token, 7); // Store token for 7 days
        console.log('User logged in and token saved in cookies:', token);
        // Redirect or show success message after login
      });
    })
    .catch((error) => {
      console.error('Error during login:', error.message);
      // Handle errors (e.g., show error message to the user)
    });
});
