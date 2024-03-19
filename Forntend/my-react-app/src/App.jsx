import React from "react";
import { Route, Routes } from "react-router-dom";
import FormCategory from "./component/FormCategory";
import FormProducts from "./component/FormProducts";
import "./index.css";
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

    // axiosBackend.get("/detailproduct/100").then((res) => console.log(res.data));
    // const data = {
    //     title: "Minuman 3",
    //     image: "yeyeye",
    //     price: 1000,
    //     category_id: 5
    // }
    // axiosBackend.post("addproduct", data)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err.response?.data))

    return (
        <div className="w-full h-100vh px-2 font-saira">
            <Routes>
                <Route path="/" element={<OrderProduk />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/pembayaran" element={<Pembayaran />} />
                </Route>
                <Route path="/riwayat" element={<RiwayatTransaksi />} />
                <Route path="/detailtransaksi/:id" element={<DetailTransaksi />} />
                <Route path="/admin" element={<ListProduct />} />
                <Route path="/detailproduk/:id" element={<DetailProduk />} />
                <Route path="/formproduk" element={<FormProducts />} />
                <Route path="/listkategori" element={<ListCategories />} />
                <Route path="/formkategori" element={<FormCategory />} />
                <Route path="/detailkategori/:id" element={<DetailKategori />} />
            </Routes>
        </div>
    )
}
