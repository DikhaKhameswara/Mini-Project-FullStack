import React from "react";
import { Route, Routes } from "react-router-dom";
import FormCategory from "./component/FormCategory";
import FormProducts from "./component/FormProducts";
import "./index.css";
import Sidebar from "./layouts/Sidebar";
import DetailKategori from "./pages/DetailKategori";
import DetailProduk from "./pages/DetailProduk";
import DetailTransaksi from "./pages/DetailTransaksi";
import ListCategories from "./pages/ListCategories";
import ListProduct from "./pages/ListProduct";
import OrderProduk from "./pages/OrderProduk";
import Pembayaran from "./pages/Pembayaran";
import RiwayatTransaksi from "./pages/RiwayatTransaksi";
import PrivateRoute from "./route/PrivateRoute";

export default function App() {

    return (
        <div className="w-full h-full font-saira flex">
            <div className=" w-[4rem]">
                <Sidebar />
            </div>
            <div className=" w-full h-svh">
                <Routes>
                    <Route path="/" element={<OrderProduk />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/pembayaran" element={<Pembayaran />} />
                    </Route>
                    <Route path="/riwayat" element={<RiwayatTransaksi />} />
                    <Route path="/detailtransaksi/:id" element={<DetailTransaksi />} />
                    <Route path="/listproduk" element={<ListProduct />} />
                    <Route path="/detailproduk/:id" element={<DetailProduk />} />
                    <Route path="/formproduk" element={<FormProducts />} />
                    <Route path="/listkategori" element={<ListCategories />} />
                    <Route path="/formkategori" element={<FormCategory />} />
                    <Route path="/detailkategori/:id" element={<DetailKategori />} />
                </Routes>
            </div>
        </div>
    )
}
