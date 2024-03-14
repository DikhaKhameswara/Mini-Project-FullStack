import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import DetailTransaksi from "./pages/DetailTransaksi";
import OrderProduk from "./pages/OrderProduk";
import Pembayaran from "./pages/Pembayaran";
import RiwayatTransaksi from "./pages/RiwayatTransaksi";
import PrivateRoute from "./route/PrivateRoute";

export default function App() {

    return (
        <div className="w-full h-100vh px-2 font-lora">
            <Routes>
                <Route path="/" element={<OrderProduk />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/pembayaran" element={<Pembayaran />} />
                </Route>
                <Route path="/riwayat" element={<RiwayatTransaksi />} />
                <Route path="/detailtransaksi/:id" element={<DetailTransaksi />} />
            </Routes>
        </div>
    )
}
