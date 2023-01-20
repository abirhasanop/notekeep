import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Contexts/AuthProvider";
import { router } from "./Router/Router";

function App() {
  const { dark } = useContext(AuthContext)
  return (
    <div className={`min-h-screen  ${dark ? "bg-[#0F1729] text-white" : "bg-[#F2F6FC]"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
