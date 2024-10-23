import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Handle form submission for signup
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    // Sign up user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);

    // Redirect to onboarding page after successful signup
    window.location.href = '/onboarding.html';
  } catch (error) {
    console.error('Error signing up:', error);
  }
});
