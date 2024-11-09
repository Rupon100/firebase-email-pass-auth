// Share fireabse config is danger
 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyADjC7BW8bPlFHcJARSDM1tzSQpOMrWG1k",
  authDomain: "email-pass-auth-b3c71.firebaseapp.com",
  projectId: "email-pass-auth-b3c71",
  storageBucket: "email-pass-auth-b3c71.firebasestorage.app",
  messagingSenderId: "504718010579",
  appId: "1:504718010579:web:82cf5f300046a2149dcc26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;