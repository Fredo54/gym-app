"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";
import { app, auth } from "../firebase";
import firebase from "firebase/compat/app";
import "dotenv/config";
import { serverUrl } from "../server";

type User = firebase.User | null;

interface AuthContextType {
  user: User;
  googleSignIn: () => void;
  signOutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  googleSignIn: () => {},
  signOutUser: () => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const provider = new GoogleAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      console.log("user changed: ", user);
      if (user) {
        setUser(user);

        const postUserData = async () => {
          try {
            const req = await fetch(`${serverUrl}/api/signin`, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({
                uuid: user?.uid,
                displayName: user?.displayName,
                email: user?.email,
              }),
            });
            console.log(req);
          } catch (err) {
            console.error(err);
          }
        };

        await postUserData();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, signOutUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
