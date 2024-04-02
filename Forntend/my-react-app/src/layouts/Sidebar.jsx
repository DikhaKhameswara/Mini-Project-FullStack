import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { GiCardboardBox } from "react-icons/gi";
import { MdDiscount } from "react-icons/md";
import { PiCalendarCheck } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className='w-[4rem] h-svh relative border-r-2 z-10'>
            <div
                className=' 
                w-full h-svh absolute text-5xl 
                flex flex-col justify-center gap-y-10 place-items-center'
            >
                <div onClick={() => navigate("/")}
                    className=' group cursor-pointer w-full relative flex place-content-center'>
                    <MdDiscount />
                    <div
                        className=' invisible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap
                         -translate-x-5 ease-in-out duration-150 group-hover:translate-x-1 group-hover:visible
                         '>
                        Order Produk
                    </div>
                </div>
                <div onClick={() => navigate("/listproduk")}
                    className=' group cursor-pointer w-full flex place-content-center relative'>
                    <FiPackage />
                    <div
                        className=' invisible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap
                         -translate-x-5 ease-in-out duration-150 group-hover:translate-x-1 group-hover:visible
                         '>
                        Produk
                    </div>
                </div>
                <div onClick={() => navigate("/listkategori")}
                    className=' group cursor-pointer w-full flex place-content-center relative'>
                    <GiCardboardBox />
                    <div
                        className=' invisible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap
                         -translate-x-5 ease-in-out duration-150 group-hover:translate-x-1 group-hover:visible
                         '>
                        Kategori
                    </div>
                </div>
                <div onClick={() => navigate("/riwayat")}
                    className=' group transition cursor-pointer w-full flex place-content-center relative'>
                    <PiCalendarCheck />
                    <div
                        className=' invisible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap
                         -translate-x-5 ease-in-out duration-150 group-hover:translate-x-1 group-hover:visible
                         '>
                        Transaksi
                    </div>
                </div>
            </div>
        </div>
    )
}
