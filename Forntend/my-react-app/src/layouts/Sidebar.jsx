import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { GiCardboardBox } from "react-icons/gi";
import { MdDiscount } from "react-icons/md";
import { PiCalendarCheck } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className='group/admin w-[4rem] h-svh relative border-r-2 z-10'>
            <div
                className=' group-hover/admin:visible 
                w-full h-svh absolute text-5xl 
                flex flex-col justify-center gap-y-10 place-items-center'
            >
                <div onClick={() => navigate("/")}
                    className=' group/title cursor-pointer w-full relative flex place-content-center'>
                    <MdDiscount />
                    <div
                        className=' invisible group-hover/title:visible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap'>
                        Order Produk
                    </div>
                </div>
                <div onClick={() => navigate("/listproduk")}
                    className=' group/title cursor-pointer w-full flex place-content-center relative'>
                    <FiPackage />
                    <div
                        className=' invisible group-hover/title:visible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap'>
                        Produk
                    </div>
                </div>
                <div onClick={() => navigate("/listkategori")}
                    className=' group/title cursor-pointer w-full flex place-content-center relative'>
                    <GiCardboardBox />
                    <div
                        className=' invisible group-hover/title:visible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap'>
                        Kategori
                    </div>
                </div>
                <div onClick={() => navigate("/riwayat")}
                    className=' group/title cursor-pointer w-full flex place-content-center relative'>
                    <PiCalendarCheck />
                    <div
                        className=' invisible group-hover/title:visible absolute left-[4rem] text-3xl
                         bg-slate-300 px-2 rounded-xl w-fit text-nowrap'>
                        Transaksi
                    </div>
                </div>
            </div>
        </div>
    )
}
