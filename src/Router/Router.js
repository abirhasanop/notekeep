import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CompletedTask from "../Pages/CompletedTask";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyTask from "../Pages/MyTask";
import SignUp from "../Pages/SignUp";

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
                element: <MyTask />
            },
            {
                path: "/completed-task",
                element: <CompletedTask />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])