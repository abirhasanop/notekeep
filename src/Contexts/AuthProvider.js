import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';



export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // console.log("user in authprovider---->", user);

    //1. Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //   2. Update Name
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // 4. Google Signin
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // 5. Logout
    const logout = () => {
        setLoading(true)
        localStorage.removeItem('aircnc-token')
        return signOut(auth)
    }

    //6. Login with Password
    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //7. Forget Password
    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }





    useEffect(() => {
        //this part will execute once the component is mounted.
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            //this part will execute once the component is unmounted.
            unsubscribe()
        }
    }, [])




    // Dark mode starts
    const [dark, setDark] = useState(false)

    const handleTheme = () => {
        setDark(!dark)
        localStorage.setItem("dark-mode", !dark)
    }

    // useEffect(() => {
    //     if (dark) {
    //         document.querySelector("html").setAttribute("data-theme", "night")
    //     } else {
    //         document.querySelector("html").setAttribute("data-theme", "light")
    //     }
    // }, [dark])

    useEffect(() => {
        const localDark = JSON.parse(localStorage.getItem("dark-mode"))
        console.log(localDark);
        setDark(localDark)
    }, [])

    // dark mode ends


    const authInfo = {
        user,
        createUser,
        updateUserProfile,
        signInWithGoogle,
        logout,
        signin,
        resetPassword,
        loading,
        setLoading,
        name: "abir jiooooo",
        handleTheme,
        dark
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;