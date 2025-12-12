import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useAxios from "../Hooks/AxiosHooks";
import Loader from "../Loader/Loader";
import { Navigate, useLocation } from "react-router";

export default function PrivateChef({ children }) {
    const { user } = useContext(AuthContext)
    const axios = useAxios()
    const location = useLocation();

    const { data: admin = [], isLoading } = useQuery({
        queryKey: ['admin', user.uid],
        queryFn: async () => {
            const res = await axios.get(`/user/${user.uid}`,
                {
                    headers: {
                        authorization: `bearer ${user.accessToken}`
                    }
                }
            )
            return res.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    if (admin.role === "chef") {
        return children
    }
    else {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

}