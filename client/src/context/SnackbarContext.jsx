import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Snackbar from '../components/Snackbar/Snackbar';

// create context
export const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('Loading..');
  const [type, setType] = useState('neutral');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { t } = useTranslation();
  const value = useMemo(() => {
    let timeoutRef = null;

    const openSnackbar = (message, type, time) => {
      clearTimeout(timeoutRef);
      setMessage(message);
      setType(type);
      setIsSnackbarOpen(true);
      if (time) {
        timeoutRef = setTimeout(() => {
          setIsSnackbarOpen(false);
        }, time);
      }
    };

    const closeSnackbar = (message, type, time) => {
      setMessage(t(message ? message : 'Done!'));
      setType(t(type ? type : 'success'));
      timeoutRef = setTimeout(
        () => {
          setIsSnackbarOpen(false);
        },
        time ? time : 1000
      );
    };

    return {
      openSnackbar,
      closeSnackbar,
      setIsSnackbarOpen,
    };
  }, []);

  return (
    <SnackbarContext.Provider value={value} displayName='SnackBar Context'>
      <Snackbar isOpen={isSnackbarOpen} message={message} type={type} />
      {children}
    </SnackbarContext.Provider>
  );
};
