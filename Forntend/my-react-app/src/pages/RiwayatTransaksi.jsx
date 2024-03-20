import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';



export default function RiwayatTransaksi() {

    const fetcher = (url) => axiosBackend.get(url).then(res => res.data);
    const { data, isLoading } = useSWR("/listtransaction", fetcher);


    const navigate = useNavigate();

    return (isLoading ? "" :
        <div className=' p-5 relative flex flex-col'>
            <div className=' relative border-b-4 border-red-700 p-2 mb-[2rem]'>
                <div className=' absolute' onClick={() => navigate("/")}>
                    <Button>
                        Back
                    </Button>
                </div>
                <div className=' text-5xl flex place-content-center'>
                    Riwayat Transaksi
                </div>
            </div>
            <div className=' flex place-content-center'>
                <table className="text-left w-full overflow-y-scroll relative">
                    <thead className="bg-black flex text-white w-full relative">
                        <tr className="flex w-full place-items-center h-[5rem] text-2xl">
                            <th className="p-4 w-[22%] border-r-2 border-white">Tanggal Transaksi</th>
                            <th className="p-4 w-[22%] border-r-2 border-white">ID Transaksi</th>
                            <th className="p-4 w-[22%] border-r-2 border-white">Total Harga</th>
                            <th className="p-4 w-[22%] border-r-2 border-white">Total Bayar</th>
                            <th className="p-4 w-[12%]">Action</th>
                        </tr>
                    </thead>
                    <tbody className=" flex flex-col items-center w-full max-h-[60vh] overflow-y-scroll">
                        {
                            data.map((item) => (
                                <tr key={item.transaction_id} className=' flex w-full text-xl items-center border-b-2 h-[5rem] border-red-700'>
                                    <td className=' p-4 w-[22%]'>{handleDate(item.transaction_date)}</td>
                                    <td className=' p-4 w-[22%]'>{item.transaction_id}</td>
                                    <td className=' p-4 w-[22%]'>{toRupiah(item.total_amount)}</td>
                                    <td className=' p-4 w-[22%]' >{toRupiah(item.total_pay)}</td>
                                    <td className=' p-4 w-[12%]' >
                                        {
                                            <span onClick={() => navigate(`/detailtransaksi/${item.transaction_id}`)}><Button>Detail Transaksi</Button></span>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
