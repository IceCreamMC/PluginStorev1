import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Handle form submission for onboarding
const onboardingForm = document.querySelector('form');

onboardingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const username = document.querySelector('#username').value;
  const avatarFile = document.querySelector('#avatar').files[0];

  // Get user ID from the cookie
  const userId = getCookie('authToken');

  if (!userId) {
    console.error('User not authenticated');
    return;
  }

  // Placeholder avatar URL (you'll need to upload the image separately)
  let avatarUrl = '';

  // If the user uploaded an avatar, store it
  if (avatarFile) {
    // You can use Firebase Storage to upload the file and get the URL
    // For now, we'll assume the avatar URL is stored somewhere
    avatarUrl = 'https://some-placeholder-url.com/avatar.png'; // Replace with actual URL after uploading
  }

  // Prepare user data to store in Firestore
  const userData = {
    userid: userId,
    username: username,
    userpicture: avatarUrl || 'https://avatars.githubusercontent.com/u/1497512222?v=4' // Fallback if no avatar is uploaded
  };

  try {
    // Save the user data in Firestore, with user ID as document ID
    await setDoc(doc(db, "users", userId), userData);
    console.log('User data stored successfully in Firestore');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
});
