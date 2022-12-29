import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router/Router";

function App() {
  return (
    <div className="min-h-screen bg-[#F2F6FC]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
