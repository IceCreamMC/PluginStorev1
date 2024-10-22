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

// Handle sign-up form submission
const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting the traditional way

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Create a new user with Firebase Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User created
      const user = userCredential.user;
      console.log('User signed up:', user);
      // Redirect or show success message
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);
      // Show error to the user
    });
});
