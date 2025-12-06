import { createContext } from "react";

const AuthContext = createContext()
export default function AuthProvider({ children }) {



    const data={

    }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}