import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({ 
    apiKey: "AIzaSyAEfPW9TPvmIPEgsUAoNuQjMtmHleAcozw",
    authDomain: "job-onboard-client.firebaseapp.com",
    projectId: "job-onboard-client",
    storageBucket: "job-onboard-client.firebasestorage.app",
    messagingSenderId: "843588075785",
    appId: "1:843588075785:web:cd6d46453bbfb88045d3d8",
    measurementId: "G-3DBT0N41CD"
});

const storage = getStorage(app);
export default storage;