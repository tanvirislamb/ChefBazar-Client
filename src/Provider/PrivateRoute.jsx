import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Spinner from "../Loader/Spinner";

export default function Private({ children }) {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Spinner />
    }
    if (user && user.email) {
        return children
    }
    else {
        <Navigate state={location.pathname} to='/login'></Navigate>
    }
}