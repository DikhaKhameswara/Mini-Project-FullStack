import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";

export default function App() {

    return (
        <div className="w-full h-100vh p-5 font-lora">
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </div>
    )
}
