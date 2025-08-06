const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD2USLQQXgxc3oUdeg-WikB9aBmfCqSvCU",
  authDomain: "leaves-7b3a2.firebaseapp.com",
  databaseURL: "https://leaves-7b3a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "leaves-7b3a2",
  storageBucket: "leaves-7b3a2.firebasestorage.app",
  messagingSenderId: "348940872332",
  appId: "1:348940872332:web:d04ea31c0aa3abf21e29a9",
  measurementId: "G-GEXMJCLYTH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };