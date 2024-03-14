import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import OrderProduk from "./pages/OrderProduk";
import Pembayaran from "./pages/Pembayaran";

export default function App() {

    return (
        <div className="w-full h-100vh px-2 font-lora">
            <Routes>
                <Route path="/" element={<OrderProduk />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
            </Routes>
        </div>
    )
}
