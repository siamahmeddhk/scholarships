// src/context/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config'; // Make sure this is your correct path

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


   const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
  return signOut(auth);
};


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = { 
     user,
     loading,
     createUser,
     signIn,
     signInWithGoogle,
     logOut,
     updateProfile
    };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
