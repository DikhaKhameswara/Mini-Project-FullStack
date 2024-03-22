import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { toRupiah } from '../utils/toRupiah';



export default function RiwayatTransaksi() {

    const fetcher = (url) => axiosBackend.get(url).then(res => res.data);
    const { data, isLoading } = useSWR("/listtransaction", fetcher);

    const columns = useMemo(
        () => [
            {
                accessorFn: row => row.transaction_date,
                id: "transaction_date",
                cell: info => info.getValue(),
                header: () => <span>Tanggal Transaksi</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.transaction_id,
                id: "transaction_id",
                cell: info => info.getValue(),
                header: () => <span>ID Transaksi</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.total_amount,
                id: "total_amount",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Total Amount</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.total_pay,
                id: "total_pay",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Total Pay</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => action(row.transaction_id),
                id: "action",
                cell: info => info.getValue(),
                header: () => <span>Action</span>,
                footer: props => props.column.id
            }
        ]
    );

    function action(id) {
        return (
            <button
                onClick={() => navigate(`/detailtransaksi/${id}`)}
                className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold w-full`}>
                Detail Transaksi
            </button>
        )
    };

    const navigate = useNavigate();

    return (isLoading ? "" :
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Riwayat Transaksi</span>
            </div>
            {
                isLoading ? "" :
                    <MyTable data={data} columns={columns} />
            }

        </div>
    )
}
