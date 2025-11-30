// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYX2CTjGtpIlwV86rKQrHEDQuw5FTvicY",
  authDomain: "vespucci-6b1be.firebaseapp.com",
  projectId: "vespucci-6b1be",
  storageBucket: "vespucci-6b1be.firebasestorage.app",
  messagingSenderId: "1067423082762",
  appId: "1:1067423082762:web:abd9484de8e70eee97b2f3"
};

// Initialiser Firebase
let firebaseApp;
let firebaseFirestore;

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
      firebaseFirestore = firebase.firestore();
      return true;
    } else if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      firebaseApp = firebase.app();
      firebaseFirestore = firebase.firestore();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur d\'initialisation Firebase:', error);
    return false;
  }
}

