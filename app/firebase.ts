// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
} from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD102_yyi7v0WaH1ZT8BMc2iir9m4YiNCo",
  authDomain: "groovy-analyst-397023.firebaseapp.com",
  projectId: "groovy-analyst-397023",
  storageBucket: "groovy-analyst-397023.appspot.com",
  messagingSenderId: "622915049804",
  appId: "1:622915049804:web:e77931748ebad49db857e9",
  measurementId: "G-08QZKERHK0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isAnalyticsSupported()
  .then(() => getAnalytics(app))
  .catch(() => null);

const auth = getAuth(app);

export { app, analytics, auth };
