import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';

export default function ListCategories() {

    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [query, setQuery] = useState(null);

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading, mutate } = useSWR(
        `/listcategories${query == null ? "" : `?${query}`}`, fetcher);

    useEffect(() => {
        setTitle(title)
        setSortBy(sortBy)
        setSortOrder(sortOrder)

        setQuery(
            (title == "" ? "" : `&name=${title}`) +
            (sortBy == "" ? "" : `&sort_by=${sortBy}`) +
            (sortBy == "" ? "" : sortOrder == "" ? "&sort_order=asc" : `&sort_order=${sortOrder}`)
        )
    }, [title, sortBy, sortOrder])
    function handleSearchVal(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }

    useEffect(() => {
        mutate()
    }, [data])

    const columns = useMemo(
        () => [
            {
                accessorFn: row => row.category_id,
                id: "category_id",
                cell: info => info.getValue(),
                header: () => <span>ID Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.category_name,
                id: "category_name",
                cell: info => info.getValue(),
                header: () => <span>Nama Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.total_products,
                id: "total_products",
                cell: info => info.getValue(),
                header: () => <span>Jumlah Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => action(row.category_id, row.category_name),
                id: "action",
                cell: info => info.getValue(),
                header: () => <span>Action</span>,
                footer: props => props.column.id
            }
        ]
    )

    function action(id, title) {
        return (
            <div className="flex place-content-evenly gap-x-3">
                <button
                    onClick={() => navigate(`/detailkategori/${id}`)}
                    className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Detail
                </button>
                <button
                    onClick={() => navigate(`/formkategori`, { state: { id: id } })}
                    className={`bg-slate-200 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Edit
                </button>
                <button
                    onClick={() => handleHapus(id, title)}
                    className={`bg-red-400 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Hapus
                </button>
            </div>
        )
    }

    const navigate = useNavigate();

    function handleHapus(id, title) {
        swallConfirmation(`Anda Ingin Menghapus \n${title}?`)
            .then(() => {
                axiosBackend.delete(`/deletecategory/${id}`)
                    .then(() => {
                        swallPopUp("Data Berhasil Dihapus", "", "success");
                        mutate();
                    })
                    .catch((err) => swallPopUp("Data Gagal Dihapus", err.response?.data, "error"))
            })
            .catch(() => swallPopUp("Data Tidak Jadi Dihapus", "", "info"))

    }
    console.log(query)
    return (
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Daftar Kategori</span>
            </div>
            <div className=' relative'>
                <div className=' text-lg right-10 border-4 w-fit rounded-2xl' onClick={() => navigate("/formkategori")}>
                    <Button logo={<FaPlus />}>
                        <span>Tambah Kategori</span>
                    </Button>
                </div>
            </div>
            <div className=' relative'>
                <div className=' flex place-content-between gap-x-2 place-items-center absolute left-[20rem] top-1'>
                    <div className='flex gap-x-1'>
                        <span className=' text-2xl'>Search Name:</span>
                        <input
                            type="text"
                            className='border-2 border-black px-1 h-[1]'
                            onChange={(e) => handleSearchVal(e)} value={title} />

                    </div>
                    <div className='relative select-none group'>
                        <div className=' transition ease-in-out duration-500 border-2 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white'>
                            {
                                sortBy != "" ? sortBy.toUpperCase() : <span>SORTING</span>
                            }
                        </div>
                        <div
                            className='invisible group-hover:visible absolute top-7 h-fit
                            z-10 p-2 border-2 bg-slate-100 rounded-2xl flex flex-col gap-y-2
                            -translate-y-7 group-hover:translate-y-0 transition-transform
                            '>
                            <div
                                onClick={() => setSortBy("name")}
                                className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                NAMA KATEGORI
                            </div>
                            <div
                                onClick={() => setSortBy("total_products")}
                                className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                JUMLAH PRODUK
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
                <div>
                    {
                        isLoading || data == undefined ? "" :
                            <MyTable data={data} columns={columns} />
                    }
                </div>
            </div>
        </div>
    )
}
