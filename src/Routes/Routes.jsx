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
import Profile from "../Pages/DashboardPages/Profile";
import MyOrders from "../Pages/DashboardPages/MyOrders";
import MyReviews from "../Pages/DashboardPages/MyReviews";
import FavMeals from "../Pages/DashboardPages/FavMeals";
import CreateMeals from "../Pages/DashboardPages/CreateMeals";
import MyMeals from "../Pages/DashboardPages/MyMeals";
import OrderReq from "../Pages/DashboardPages/OrderReq";
import ManageUser from "../Pages/DashboardPages/ManageUser";
import ManageReq from "../Pages/DashboardPages/ManageReq";
import PlatformStat from "../Pages/DashboardPages/PlatformStat";

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
    },
    {
        path: '/dashboard',
        element: <Private><Dashboard></Dashboard></Private>,
        children: [
            {
                index: true,
                Component: Profile
            },
            {
                path: '/dashboard/profile',
                Component: Profile
            },
            {
                path: '/dashboard/myorders',
                Component: MyOrders
            },
            {
                path: '/dashboard/myreviews',
                Component: MyReviews
            },
            {
                path: '/dashboard/myfavmeals',
                Component: FavMeals
            },
            {
                path: '/dashboard/createmeals',
                Component: CreateMeals
            },
            {
                path: '/dashboard/mymeals',
                Component: MyMeals
            },
            {
                path: '/dashboard/orderrequest',
                Component: OrderReq
            },
            {
                path: '/dashboard/manageuser',
                Component: ManageUser
            },
            {
                path: '/dashboard/managerequest',
                Component: ManageReq
            },
            {
                path: '/dashboard/platformstatistics',
                Component: PlatformStat
            }
        ]
    }
])

export default router