import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

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
const storage = getStorage(app); // Initialize Firebase Storage

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
  let username = document.querySelector('#username').value;
  const avatarFile = document.querySelector('#avatar').files[0];

  // Validation: Ensure username starts with '@' and is less than or equal to 18 characters
  if (!username.startsWith('@')) {
    username = '@' + username; // Auto-add '@' if missing
  }

  if (username.length > 18) {
    alert('Username must be 18 characters or less.');
    return;
  }

  // Get user ID from the cookie
  const userId = getCookie('authToken');

  if (!userId) {
    console.error('User not authenticated');
    return;
  }

  let avatarUrl = '';

  // If the user uploaded an avatar, store it in Firebase Storage
  if (avatarFile) {
    const storageRef = ref(storage, `avatars/${userId}/${avatarFile.name}`); // Create a storage reference
    try {
      // Upload the avatar file
      const snapshot = await uploadBytes(storageRef, avatarFile);
      console.log('Avatar uploaded successfully!');

      // Get the URL of the uploaded avatar
      avatarUrl = await getDownloadURL(snapshot.ref);
      console.log('Avatar URL:', avatarUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
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
