import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({ 
    apiKey: "AIzaSyDMV_Kz_nM9p9165O1kMGp1XdoiRRbRj9I",
    authDomain: "smartinserat-66187.firebaseapp.com",
    projectId: "smartinserat-66187",
    storageBucket: "smartinserat-66187.firebasestorage.app",
    messagingSenderId: "1075537386418",
    appId: "1:1075537386418:web:34f31bce747f3e605162ab",
    measurementId: "G-DT0GNZFR0X" 
});

const storage = getStorage(app);
export default storage;

  // apiKey: "AIzaSyAEfPW9TPvmIPEgsUAoNuQjMtmHleAcozw",
    // authDomain: "job-onboard-client.firebaseapp.com",
    // projectId: "job-onboard-client",
    // storageBucket: "job-onboard-client.firebasestorage.app",
    // messagingSenderId: "843588075785",
    // appId: "1:843588075785:web:cd6d46453bbfb88045d3d8",
    // measurementId: "G-3DBT0N41CD"