import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';

export default function DetailTransaksi() {
    const params = useParams();

    const navigate = useNavigate();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading } = useSWR(`/detailtransaction/${params.id}`, fetcher);

    const columns = useMemo(
        () => [
            {
                accessorFn: row => row.product_id,
                id: "id",
                cell: info => info.getValue(),
                header: () => <span>ID Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.product_title,
                id: "product_title",
                cell: info => info.getValue(),
                header: () => <span>Nama Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.product_price,
                id: "product_price",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Harga Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.product_quantity,
                id: "product_quantity",
                cell: info => info.getValue(),
                header: () => <span>Quantity</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.product_subtotal,
                id: "product_subtotal",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Subtotal</span>,
                footer: props => props.column.id
            }
        ]
    );



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
            {
                isLoading ? "" :
                    <MyTable data={data.product_details_transaction} columns={columns} />
            }
        </div>
    )
}
