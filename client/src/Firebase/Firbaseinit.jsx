import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firbaseconfig";
  

 const initializeFirebase = ()=>{
    initializeApp(firebaseConfig);
}
export default initializeFirebase;