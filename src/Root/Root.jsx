import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Spinner from "../Loader/Spinner";
import Loader from "../Loader/Loader";
import Footer from "../Components/Footer";

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
                        <Footer></Footer>
                    </div>
            }
        </div>
    )
}