import React, { createContext } from "react";
import useFirebase from "./useFirebase";

export const OAuthContext = createContext();


const FirebaseProvider = ({ children }) => {
  const allContexts = useFirebase();
  return (
    <OAuthContext.Provider value={allContexts}>
      {children}
    </OAuthContext.Provider>
  );
};

export default FirebaseProvider;