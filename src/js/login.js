<script type="module">
  // Import the functions you need from the SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

  // Handle login form submission
  const loginForm = document.querySelector('form');
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Sign in with Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User logged in:', user);
        // Redirect or show success message
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error logging in:', errorCode, errorMessage);
        // Show error to the user
      });
  });
</script>
