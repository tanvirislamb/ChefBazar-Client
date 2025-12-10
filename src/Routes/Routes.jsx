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
import UpdateMeal from "../Pages/DashboardPages/UpdateMeal";
import Payment from "../Pages/DashboardPages/Payment";
import SuccessPage from "../Pages/DashboardPages/SuccesPage";
import CancelPage from "../Pages/DashboardPages/CancelPage";

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
                path: 'profile',
                Component: Profile
            },
            {
                path: 'myorders',
                Component: MyOrders
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'payemnt-success',
                Component: SuccessPage
            },
            {
                path: 'payemnt-cancelled',
                Component: CancelPage
            },
            {
                path: 'myreviews',
                Component: MyReviews
            },
            {
                path: 'myfavmeals',
                Component: FavMeals
            },
            {
                path: 'createmeals',
                Component: CreateMeals
            },
            {
                path: 'mymeals',
                Component: MyMeals
            },
            {
                path: 'update',
                Component: UpdateMeal
            },
            {
                path: 'orderrequest',
                Component: OrderReq
            },
            {
                path: 'manageuser',
                Component: ManageUser
            },
            {
                path: 'managerequest',
                Component: ManageReq
            },
            {
                path: 'platformstatistics',
                Component: PlatformStat
            }
        ]
    }
])

export default router