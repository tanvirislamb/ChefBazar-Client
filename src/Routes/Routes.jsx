import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Root/Root";
import Meals from "../Pages/Meals";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Private from "../Provider/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Details from "../Pages/Details";
import Order from "../Pages/Order";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/meals',
                Component: Meals
            },
            {
                path: '/dashboard',
                element: <Private><Dashboard></Dashboard></Private>
            },
            {
                path: '/details/:id',
                element: <Private><Details></Details></Private>
            },
            {
                path: '/order',
                element: <Private><Order></Order></Private>
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    }
])

export default router