import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext()
export default function AuthProvider({ children }) {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerFuction = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const update = (newData) => {
        return updateProfile(auth.currentUser, newData)
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const currentuser = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        })
        return () => currentuser()
    }, [auth])

    const data = {
        registerFuction,
        update,
        setUser,
        logIn,
        logout,
        user,
        loading
    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}