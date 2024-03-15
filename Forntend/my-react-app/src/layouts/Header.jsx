import React from 'react';
import { FaHistory } from "react-icons/fa";
import { SiAdminer } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';


export default function Header() {
    const navigate = useNavigate();
    return (
        <div className=' flex place-content-between'>
            <div className='text-5xl font-extrabold'>
                LYR Team PC
            </div>
            <div className=' flex gap-x-7'>
                <div onClick={() => navigate("/admin")}>
                    <Button children={"Admin"} logo={<SiAdminer />} />
                </div>
                <div onClick={() => navigate("/riwayat")}>
                    <Button children={"Riwayat Transaksi"} logo={<FaHistory />} />
                </div>
            </div>
        </div>
    )
}
