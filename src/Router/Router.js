import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CompletedTask from "../Pages/CompletedTask";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyTask from "../Pages/MyTask";
import SignUp from "../Pages/SignUp";
import EditTask from "../Pages/EditTask";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/my-task",
                element: <PrivateRoute><MyTask /></PrivateRoute>
            },
            {
                path: "/completed-task",
                element: <PrivateRoute><CompletedTask /></PrivateRoute>
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/edit-task/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_SERVER_URL}/task/edit/${params.id}`),
                element: <PrivateRoute><EditTask /></PrivateRoute>
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }
])