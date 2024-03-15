import React from "react";
import { Route, Routes } from "react-router-dom";
import AddUpdateForm from "./component/AddUpdateForm";
import "./index.css";
import DetailProduk from "./pages/DetailProduk";
import DetailTransaksi from "./pages/DetailTransaksi";
import ListProduct from "./pages/ListProduct";
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
                <Route path="/admin" element={<ListProduct />} />
                <Route path="/detailproduk/:id" element={<DetailProduk />} />
                <Route path="/addupdateform" element={<AddUpdateForm />} />
            </Routes>
        </div>
    )
}
