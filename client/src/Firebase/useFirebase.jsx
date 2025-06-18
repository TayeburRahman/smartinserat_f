import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup, signOut
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//   import { useGoogleSingInMutation } from "../../features/auth/authApi";
//   import { userLoggedIn } from "../../features/auth/authSlice";
import initializeFirebase from "./Firbaseinit";
import axios from "axios";
import { config } from "../assets/config/config";
import { AuthContext } from "../context/AuthContext";

const apiUrl = config.api.url;
// initialize Firebase app
initializeFirebase();


const useFirebase = () => {
    const [user, setUser] = useState();
    const [admin, setAdmin] = useState('');
    const [isLoading, setIstLoading] = useState(true);
    const [authError, setError] = useState("");
    const [isDestination, setDestination] = useState('');
    const history = useNavigate()
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [accessToken, setAccessToken] = useState(null);

    const { googleLogin } = useContext(AuthContext);

    useEffect(() => {
        const interceptorId = axios.interceptors.request.use(
            (config) => {
                config.withCredentials = true;
                config.credentials = "include";
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(interceptorId);
        };
    }, [accessToken]);


    const signInWithGoogle = async (location) => {
        setIstLoading(true);
        await signInWithPopup(auth, provider)
            .then((result) => {

                console.log("result.user", result.user)
                // user data save or update
                const localUser = result.user;
                // saveUser(user.email, user.displayName, 'PUT');

                console.log("LocalUser result", result.user);
                const useData = {
                    email: localUser?.email,
                    name: localUser?.displayName,
                    phone: localUser?.phoneNumber,
                    img: localUser?.photoURL
                }
                /// TODO: Api call for google auth and save local
               

                if (useData?.email) {
                    googleLogin(useData);
                    setError("");
                    return;
                } else {
                    setError("Login field! server error");
                }

            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIstLoading(false));
    };





    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            })
            // Loading
            .finally(() => setIstLoading(false));
    };

    return {
        user,
        logOut,
        isLoading,
        authError,
        signInWithGoogle, 
        admin,
    };
};

export default useFirebase;