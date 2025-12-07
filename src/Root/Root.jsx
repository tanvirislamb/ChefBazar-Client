import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Spinner from "../Loader/Spinner";

export default function Root() {
    const { loading } = useContext(AuthContext)
    return (
        <div>
            {
                loading ?
                    <div className="h-[90vh] flex justify-center items-center">
                        <Spinner />
                    </div>
                    :
                    <div>
                        <Navbar></Navbar>
                        <Outlet></Outlet>
                    </div>
            }
        </div>
    )
}