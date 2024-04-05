import { DatePicker } from '@gsebdev/react-simple-datepicker';
import React, { useEffect, useMemo, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import { TbTilde } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { handleDate } from '../utils/handleDate';
import { toRupiah } from '../utils/toRupiah';


export default function RiwayatTransaksi() {

    const [productIds, setProductIds] = useState([]);
    const [queryProductIds, setQueryProductIds] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [query, setQuery] = useState("");
    const [start_total_amount, setStart_total_amount] = useState(null);
    const [end_total_amount, setEnd_total_amount] = useState(null);
    const [start_transaction_date, setStart_transaction_date] = useState(null);
    const [end_transaction_date, setEnd_transaction_date] = useState(null);


    useEffect(() => {
        setStart_total_amount(start_total_amount);
        setEnd_total_amount(end_total_amount);
        setSortBy(sortBy);
        setSortOrder(sortOrder);
        setProductIds(productIds);
        if (productIds.length > 0) {
            let val = "";
            for (const id of productIds) {
                val += id == productIds[productIds.length - 1] ? id : `${id},`
            }
            setQueryProductIds(val);
        }
        if (productIds.length == 0) {
            setQueryProductIds("");
        }
        setQuery(
            (queryProductIds == "" ? "" : `&products=${queryProductIds}`) +
            (start_total_amount == null ? "" : `&start_total_amount=${start_total_amount}`) +
            (end_total_amount == null ? "" : `&end_total_amount=${end_total_amount}`) +
            (start_transaction_date == null ? "" : `&start_transaction_date=${start_transaction_date}`) +
            (end_transaction_date == null ? "" : `&end_transaction_date=${end_transaction_date}`) +
            (sortBy == "" ? "" : `&sort_by=${sortBy}`) +
            (sortBy == "" ? "" : sortOrder == "" ? "&sort_order=asc" : `&sort_order=${sortOrder}`)
        )

    }, [productIds, queryProductIds,
        start_total_amount, end_total_amount,
        start_transaction_date, end_transaction_date,
        sortBy, sortOrder,
        query])

    const fetcher = (url) => axiosBackend.get(url).then(res => res.data);
    const { data, isLoading: iLT } = useSWR(
        `/listtransaction${query == "" ? "" : `?${query}`}`, fetcher
    );

    console.log(query)

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

    const setDateFilter = (e) => {
        const date = e.target.value.split("/");
        const dayOfMonth = date[1];
        const month = date[0];
        const year = date[2];

        const tgl = year + "-" + month + "-" + dayOfMonth;
        if (e.target.id === "start_transaction_date") {
            setStart_transaction_date(tgl)
        }
        if (e.target.id === "end_transaction_date") {
            setEnd_transaction_date(tgl)
        }
    }

    return (
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Riwayat Transaksi</span>
            </div>
            <div className=' flex flex-row gap-x-3'>
                <div className=' flex flex-col w-[15%] select-none gap-y-2'>
                    <div className=' h-[15rem] border-2 rounded-xl p-1'>
                        <h2 className=' text-3xl font-bold border-b-2  border-red-700 h-[2rem]'>
                            Filter Produk
                        </h2>
                        <div className=' overflow-auto h-[85%] mt-2'>
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

                    <div
                        className=' h-fit border-2 rounded-xl w-full
                    flex flex-col place-content-start p-1
                    '>
                        <span className=' text-3xl font-bold border-b-2  border-red-700 mb-2'>Filter Tanggal: </span>
                        <DatePicker
                            id='start_transaction_date'
                            placeholder='Tanggal Awal Transaksi'
                            onChange={setDateFilter}
                        />
                        <DatePicker
                            id='end_transaction_date'
                            placeholder='Tanggal Akhir Transaksi'
                            onChange={setDateFilter}
                        />
                    </div>
                    <div className=' h-[10rem] border-2 rounded-xl p-1 flex flex-col w-full'>
                        <span className=' text-3xl font-bold border-b-2  border-red-700 mb-2'>Rentang Harga: </span>
                        <div className=' flex flex-col place-items-center'>
                            <CurrencyInput
                                id="price"
                                name='price'
                                prefix='Rp.'
                                // onChange={tesss}
                                placeholder="Harga Terendah"
                                decimalsLimit={0}
                                value={start_total_amount}
                                onValueChange={(value, names, values) => setStart_total_amount(values.float)}
                                className='border-2 border-blue-300 w-full rounded-lg px-1 text-lg'
                            />
                            <TbTilde className=' text-3xl' />
                            <CurrencyInput
                                id="price"
                                name='price'
                                prefix='Rp.'
                                // onChange={tesss}
                                placeholder="Harga Tertinggi"
                                decimalsLimit={0}
                                value={end_total_amount}
                                onValueChange={(value, names, values) => setEnd_total_amount(values.float)}
                                className='border-2 border-blue-300 w-full rounded-lg px-1 h-[2rem] text-lg'
                            />
                            {
                                start_total_amount != null && end_total_amount != null && end_total_amount < start_total_amount ?
                                    <span className=' absolute bottom-9 text-red-500 text-sm'>
                                        Filter Harga Tidak Bekerja Karena Rentang Harga Salah
                                    </span>
                                    : ""
                            }
                        </div>
                    </div>
                </div>
                <div className=' w-[90%] relative flex flex-col '>
                    <div className=' absolute left-[20rem] top-2 z-10 flex flex-row gap-x-2 text-xl'>
                        <div className=' relative select-none group'>
                            <div className=' transition ease-in-out duration-500 border-2 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white'>
                                {
                                    sortBy != "" ? sortBy.toUpperCase() : <span>SORTING</span>
                                }
                            </div>
                            <div
                                className='invisible group-hover:visible absolute top-8 h-fit
                            z-10 p-2 border-2 bg-slate-100 rounded-2xl flex flex-col gap-y-2
                            -translate-y-7 group-hover:translate-y-0 transition-transform
                            '>
                                <div
                                    onClick={() => setSortBy("transactions_date")}
                                    className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                    TANGGAL TRANSAKSI
                                </div>
                                <div
                                    onClick={() => setSortBy("total_amount")}
                                    className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                    TOTAL HARGA
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => sortOrder == "asc" ? setSortOrder("desc") : setSortOrder("asc")}
                            className=' transition ease-in-out duration-500 border-2 cursor-pointer select-none rounded-lg hover:bg-red-500 hover:text-white text-3xl h-fit'>
                            {
                                sortOrder == "desc" ? <HiOutlineSortDescending /> : <HiOutlineSortAscending />
                            }
                        </div>
                    </div>
                    <div className=' relative'>
                        {
                            iLT || data == undefined ? "" :
                                <MyTable data={data} columns={columns} />
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}
