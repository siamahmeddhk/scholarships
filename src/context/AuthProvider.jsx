// // // // src/context/AuthProvider.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// // // import { AuthContext } from './AuthContext';
// // // import { auth } from '../firebase/firebase.config'; // Make sure this is your correct path

// // // const googleProvider = new GoogleAuthProvider();


// // // const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);


// // //    const createUser = (email, password) => {
// // //   return createUserWithEmailAndPassword(auth, email, password);
// // // };

// // // const signInWithGoogle = () => {
// // //   return signInWithPopup(auth, googleProvider);
// // // };

// // //   const signIn = (email, password) => {
// // //     setLoading(true);
// // //     return signInWithEmailAndPassword(auth, email, password);
// // //   };

// // //   const logOut = () => {
// // //   return signOut(auth);
// // // };


// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// // //       setUser(currentUser);
// // //       setLoading(false);
// // //     });

// // //     return () => unsubscribe();
// // //   }, []);

// // //   const authInfo = { 
// // //      user,
// // //      loading,
// // //      createUser,
// // //      signIn,
// // //      signInWithGoogle,
// // //      logOut,
// // //      updateProfile
// // //     };

// // //   return (
// // //     <AuthContext.Provider value={authInfo}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export default AuthProvider;



// // // src/context/AuthProvider.jsx
// // import React, { useEffect, useState } from "react";
// // import {
// //   createUserWithEmailAndPassword,
// //   GoogleAuthProvider,
// //   onAuthStateChanged,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   signOut,
// //   updateProfile as firebaseUpdateProfile,
// // } from "firebase/auth";
// // import { AuthContext } from "./AuthContext";
// // import { auth } from "../firebase/firebase.config";

// // const googleProvider = new GoogleAuthProvider();

// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // ✅ Create user & set displayName + photoURL
// //   const createUser = async (email, password, name, photoURL) => {
// //     setLoading(true);
// //     const userCredential = await createUserWithEmailAndPassword(
// //       auth,
// //       email,
// //       password
// //     );
// //     if (name || photoURL) {
// //       await firebaseUpdateProfile(userCredential.user, {
// //         displayName: name || "",
// //         photoURL: photoURL || "https://via.placeholder.com/150",
// //       });
// //     }
// //     // Force state update with latest user info
// //     setUser({ ...userCredential.user });
// //     setLoading(false);
// //     return userCredential.user;
// //   };

// //   // ✅ Google sign-in
// //   const signInWithGoogle = async () => {
// //     setLoading(true);
// //     const result = await signInWithPopup(auth, googleProvider);
// //     setUser(result.user); // update state immediately
// //     setLoading(false);
// //     return result.user;
// //   };

// //   // ✅ Email/Password login
// //   const signIn = async (email, password) => {
// //     setLoading(true);
// //     const result = await signInWithEmailAndPassword(auth, email, password);
// //     setUser(result.user);
// //     setLoading(false);
// //     return result.user;
// //   };

// //   // ✅ Log out
// //   const logOut = async () => {
// //     setLoading(true);
// //     await signOut(auth);
// //     setUser(null);
// //     setLoading(false);
// //   };

// //   // ✅ Watch auth state changes
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   // ✅ Expose updateProfile wrapper (optional)
// //   const updateUserProfile = async (profile) => {
// //     if (auth.currentUser) {
// //       await firebaseUpdateProfile(auth.currentUser, profile);
// //       setUser({ ...auth.currentUser });
// //     }
// //   };

// //   const authInfo = {
// //     user,
// //     loading,
// //     createUser,
// //     signIn,
// //     signInWithGoogle,
// //     logOut,
// //     updateUserProfile,
// //   };

// //   return (
// //     <AuthContext.Provider value={authInfo}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default AuthProvider;









// import React, { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile as firebaseUpdateProfile,
// } from "firebase/auth";
// import { AuthContext } from "./AuthContext";
// import { auth } from "../firebase/firebase.config";

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Create user and set profile, then reload user to get fresh data
//   const createUser = async (email, password, name, photoURL) => {
//     setLoading(true);
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//     if (name || photoURL) {
//       await firebaseUpdateProfile(userCredential.user, {
//         displayName: name || "",
//         photoURL: photoURL || "https://via.placeholder.com/150",
//       });
//       await auth.currentUser.reload();
//     }

//     setUser(auth.currentUser);
//     setLoading(false);
//     return auth.currentUser;
//   };

//   // Google Sign-In
//   const signInWithGoogle = async () => {
//     setLoading(true);
//     const result = await signInWithPopup(auth, googleProvider);
//     setUser(result.user);
//     setLoading(false);
//     return result.user;
//   };

//   // Email/password login
//   const signIn = async (email, password) => {
//     setLoading(true);
//     const result = await signInWithEmailAndPassword(auth, email, password);
//     setUser(result.user);
//     setLoading(false);
//     return result.user;
//   };

//   // Logout
//   const logOut = async () => {
//     setLoading(true);
//     await signOut(auth);
//     setUser(null);
//     setLoading(false);
//   };

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Update profile helper (optional)
//   const updateUserProfile = async (profile) => {
//     if (auth.currentUser) {
//       await firebaseUpdateProfile(auth.currentUser, profile);
//       setUser({ ...auth.currentUser });
//     }
//   };

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     logOut,
//     updateUserProfile,
//   };

//   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;












import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
  getIdToken,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: fetch Firebase ID token and store in localStorage
  const fetchAndStoreToken = async (firebaseUser) => {
    if (!firebaseUser) {
      localStorage.removeItem("access-token");
      return;
    }
    const token = await getIdToken(firebaseUser);
    localStorage.setItem("access-token", token);
  };

  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (name || photoURL) {
      await firebaseUpdateProfile(userCredential.user, {
        displayName: name || "",
        photoURL: photoURL || "https://via.placeholder.com/150",
      });
      await auth.currentUser.reload();
    }

    setUser(auth.currentUser);
    await fetchAndStoreToken(auth.currentUser); // <-- Store token after sign up
    setLoading(false);
    return auth.currentUser;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    await fetchAndStoreToken(result.user); // <-- Store token after Google sign-in
    setLoading(false);
    return result.user;
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    await fetchAndStoreToken(result.user); // <-- Store token after sign-in
    setLoading(false);
    return result.user;
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("access-token"); // <-- Remove token on logout
    setLoading(false);
  };

  // Listen for auth state changes and update token accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      await fetchAndStoreToken(currentUser); // <-- Update token on user state change
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (profile) => {
    if (auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser, profile);
      setUser({ ...auth.currentUser });
      await fetchAndStoreToken(auth.currentUser); // <-- Refresh token if profile updates
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
