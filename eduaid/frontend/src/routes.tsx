import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Chatbot from "./components/Chatbot";


export const router = createBrowserRouter([
{ path: "/", element: <Home /> },
{ path: "/chatbot", element: <Chatbot /> },
]);