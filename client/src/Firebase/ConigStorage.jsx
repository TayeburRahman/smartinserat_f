import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({ 
    apiKey: "AIzaSyBCO67_x0QNiiRHnC2kB51FUDdWLlhcyKM",
    authDomain: "smartinserat-77dcb.firebaseapp.com",
    projectId: "smartinserat-77dcb",
    storageBucket: "smartinserat-77dcb.appspot.com",
    messagingSenderId: "451114753410",
    appId: "1:451114753410:web:9b72cb064ffd2968ca839b",
    measurementId: "G-WF8X6YEYST" 
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