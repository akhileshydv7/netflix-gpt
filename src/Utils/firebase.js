import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCtBBcFOnU0GfGano4zOVG3dqgBC2_C3iA",
    authDomain: "netflix-gpt-201e3.firebaseapp.com",
    projectId: "netflix-gpt-201e3",
    storageBucket: "netflix-gpt-201e3.appspot.com",
    messagingSenderId: "738426741881",
    appId: "1:738426741881:web:558eadc712a96a829560a8",
    measurementId: "G-4QC1PB3VGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth();