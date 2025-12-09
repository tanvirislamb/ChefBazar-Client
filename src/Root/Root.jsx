import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Spinner from "../Loader/Spinner";
import Loader from "../Loader/Loader";

export default function Root() {
    const { loading } = useContext(AuthContext)

    return (
        <div>
            {
                loading ?
                    <Loader />
                    :
                    <div>
                        <Navbar></Navbar>
                        <Outlet></Outlet>
                    </div>
            }
        </div>
    )
}