import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';



export default function RiwayatTransaksi() {

    const fetcher = (url) => axiosBackend.get(url).then(res => res.data?.data);
    const { data, isLoading } = useSWR("/listtransaction", fetcher);
    console.log(data);

    const navigate = useNavigate();

    return (isLoading ? "" :
        <div className=' p-5 relative'>
            <div className=' absolute' onClick={() => navigate("/")}>
                <Button>
                    Back
                </Button>
            </div>
            <div className=' text-5xl mb-[5rem] flex place-content-center'>
                Riwayat Transaksi
                <hr />
            </div>
            <div className=' flex place-content-center'>
                <table className="text-left w-full">
                    <thead className="bg-black flex text-white w-full">
                        <tr className="flex w-full mb-4 text-2xl">
                            <th className="p-4 w-[22%]">Tanggal Transaksi</th>
                            <th className="p-4 w-[22%]">ID Transaksi</th>
                            <th className="p-4 w-[22%]">Total Harga</th>
                            <th className="p-4 w-[22%]">Total Bayar</th>
                            <th className="p-4 w-[12%]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-auto w-full h-[60vh]">
                        {
                            data.map((item) => (
                                <tr key={item.transaction_id} className=' flex w-full mb-4'>
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
