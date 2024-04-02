import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';



export default function RiwayatTransaksi() {

    const [query, setQuery] = useState("");
    const [productIds, setProductIds] = useState([]);


    useEffect(() => {
        setProductIds(productIds)
        console.log(productIds)
        if (productIds.length > 0) {
            let val = "";
            for (const id of productIds) {
                val += id == productIds[productIds.length - 1] ? id : `${id},`
            }
            setQuery(`?products=${val}`)
        }

    }, [productIds])

    const fetcher = (url) => axiosBackend.get(url).then(res => res.data);
    const { data, isLoading: iLT } = useSWR(
        `/listtransaction${productIds.length == 0 ? "" : query}`, fetcher
    );


    const { data: products, isLoading: iLP } = useSWR("/listproduct", fetcher);

    const [isLoading, setIsLoading] = useState(iLT || iLP);
    useEffect(() => {
        setIsLoading(iLP || iLT)
    }, [iLP, iLT])

    const columns = useMemo(
        () => [
            {
                accessorFn: row => handleDate(row.transaction_date),
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

    function handleSearchByProduct(id) {
        if (productIds.some(p => p == id)) {
            setProductIds(productIds.filter(p => p != id))
        }
        else {
            setProductIds([...productIds, id])
        }
    }


    return (
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Riwayat Transaksi</span>
            </div>
            <div className=' flex flex-row gap-x-3'>
                <div className=' w-[15%] select-none h-[30rem] border-2 rounded-xl p-1'>
                    <h2 className=' text-3xl font-bold border-b-2  border-red-700 h-[8%]'>
                        Filter Produk
                    </h2>
                    <div className=' overflow-auto h-[90%] mt-2'>
                        {
                            products?.map(item => (
                                <ol key={item.id}>
                                    <input
                                        type="checkbox"
                                        name={item.title}
                                        id={item.id}
                                        value={item.id}
                                        onChange={(e) => handleSearchByProduct(e.target.value)}

                                    />
                                    <label htmlFor={item.id}>
                                        {item.title}
                                    </label>
                                </ol>
                            ))

                        }
                    </div>
                </div>
                <div className=' w-[90%]'>
                    {
                        iLT ? "" :
                            <MyTable data={data} columns={columns} />
                    }
                </div>
            </div>

        </div>
    )
}
