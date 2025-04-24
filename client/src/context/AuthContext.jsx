import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { config } from "../assets/config/config";
import ThemedSuspense from "../components/ThemedSuspense";
import toast from "react-hot-toast";

const apiUrl = config.api.url;

// create context
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const retrievedToken = localStorage.getItem("accessToken");
      const retrievedUser = localStorage.getItem("user");
      if (retrievedToken && retrievedUser) {
        try {
          const response = await axios.get(`${apiUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${retrievedToken}` },
          });
          setUser(response.data.data);
          setAccessToken(retrievedToken); // Update state for consistency
          localStorage.setItem("accessToken", retrievedToken);
          localStorage.setItem("user", JSON.stringify(response.data.data));
        } catch {
          // Handle error, possibly clear storage if token is invalid
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      }
      setLoaded(true);
    };
    fetchUser();
  }, []);

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

  const value = useMemo(() => {
    const register = (
      username,
      email,
      phone_number,
      password,
      confirmPassword,
      lastname,
      role
    ) => {
      return axios
        .post(`${apiUrl}/auth/register`, {
          name: username,
          email,
          phone_number,
          password,
          confirmPassword,
          lastname,
          role,
        })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
        });
    };

    const login = (email, password) => {
      return axios
        .post(`${apiUrl}/auth/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("-----------------response", response);
          setAccessToken(response.data.data.accessToken);
          setUser(response.data.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("accessToken", response.data.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    };

    const googleLogin = (useData) => {
      axios
        .post(`${apiUrl}/auth/google`, useData)
        .then((response) => {
          console.log("-----------------response", response);
          setAccessToken(response.data.data.accessToken);
          setUser(response.data.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("accessToken", response.data.data.accessToken);
          // history.push('/app`')
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    };

    const logout = () => {
      // return axios
      //   .post(`${apiUrl}/v1/auth/logout`, {})
      //   .then((response) => {
      // window.localStorage.setItem("logout", moment());
      localStorage.setItem("accessToken", null);
      localStorage.setItem("user", null);
      localStorage.setItem("imgMultiStepForm", null);
      localStorage.setItem("planMultiStepForm", null);
      setAccessToken(null);
      setUser(null);
      // })
      // .catch((err) => { });
    };

    const forgotPassword = (email) => {
      return axios
        .post(`${apiUrl}/auth/forgot-password`, {
          email: email,
        })
        .then(() => {
          localStorage.setItem("forgot_password_account", email);
        });
    };

    const verifyOtp = (code, email) => {
      return axios.post(`${apiUrl}/auth/verify-otp`, {
        code,
        email,
      });
    };
    const resendForgetOtp = (email) => {
      return axios.post(`${apiUrl}/auth/forgot-resend`, {
        email,
      });
    };

    const resetPassword = (email, password, confirmPassword) => {
      return axios.post(`${apiUrl}/auth/reset-password?email=${email}`, {
        newPassword: password,
        confirmPassword: confirmPassword,
      });
    };

    const accountActive = (code, email) => {
      return axios
        .post(`${apiUrl}/auth/activate-user`, {
          userEmail: email,
          activation_code: code,
        })
        .then((response) => {
          setAccessToken(response.data.data.accessToken);
          setUser(response.data.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("accessToken", response.data.data.accessToken);
        });
    };

    const resendActiveOtp = (email) => {
      return axios.post(`${apiUrl}/auth/active-resend`, {
        email,
      });
    };

    return {
      user,
      setUser,
      register,
      login,
      logout,
      forgotPassword,
      verifyOtp,
      resendForgetOtp,
      accountActive,
      resendActiveOtp,
      resetPassword,
      googleLogin,
    };
  }, [user]);

  if (!isLoaded) {
    return <ThemedSuspense />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
