import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';

export default function DetailTransaksi() {
    const params = useParams();

    const navigate = useNavigate();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading } = useSWR(`/detailtransaction/${params.id}`, fetcher);
    setTimeout(() => {
        console.log(data?.product_details_transaction[0])
    }, 2000);


    return (isLoading ? "" :
        <div className=' flex flex-col m-5 gap-y-3'>
            <div className=' text-5xl flex place-content-center'>
                Detail Transaksi
            </div>
            <div className=' relative mx-[2%]'>
                <hr className=' border-4 border-red-900 mb-7' />
                <div className=' absolute right-0' onClick={() => navigate("/riwayat")}>
                    <Button>
                        Back
                    </Button>
                </div>
            </div>
            <div className='mb-[3rem]'>
                <table className='mx-[2%]'>
                    <thead className=' text-left text-3xl h-[13rem]'>
                        <tr className=''>
                            <th>ID Transaksi</th>
                            <td>:</td>
                            <td className=' text-right'>{data?.transaction_id}</td>
                        </tr>
                        <tr className=''>
                            <th>Tanggal Transaksi</th>
                            <td>:</td>
                            <td className=' text-right'>{handleDate(data?.transaction_date)}</td>
                        </tr>
                        <tr className=''>
                            <th>Total Harga</th>
                            <td>:</td>
                            <td className=' text-right'>{toRupiah(data?.total_amount)}</td>
                        </tr>
                        <tr className=''>
                            <th>Total Bayar</th>
                            <td>:</td>
                            <td className=' text-right'>{toRupiah(data?.total_pay)}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <table className="text-left mx-[2%] flex flex-col">
                <thead className="bg-black text-white w-full">
                    <tr className="flex w-full min-h-[2rem] text-xl ">
                        <th className="p-1 w-[10%]">ID Produk</th>
                        <th className="p-1 w-[30%]">Nama Produk</th>
                        <th className="p-1 w-[20%]">Harga Satuan</th>
                        <th className="p-1 w-[20%]">Quantity</th>
                        <th className="p-1 w-[20%]">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="bg-grey-light flex flex-col overflow-auto w-full h-[40vh]">
                    {
                        data?.product_details_transaction?.map((item) => (
                            <tr key={item.product_id} className=' flex w-full min-h-[3rem] max-h-[5rem]'>
                                <td className=' p-1 w-[10%] border-b-2 border-red-700 flex place-items-center'>{item.product_id}</td>
                                <td className=' p-1 w-[30%] border-b-2 border-red-700 flex place-items-center'>{item.product_title}</td>
                                <td className=' p-1 w-[20%] border-b-2 border-red-700 flex place-items-center'>{toRupiah(item.product_price)}</td>
                                <td className=' p-1 w-[20%] border-b-2 border-red-700 flex place-items-center' >{item.product_quantity}</td>
                                <td className=' p-1 w-[20%] border-b-2 border-red-700 flex place-items-center' >{toRupiah(item?.product_subtotal)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
