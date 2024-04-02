import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import CategoriesButton from '../component/CategoriesButton';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';
import { toRupiah } from '../utils/toRupiah';

export default function ListProduct() {

    const [c_Id, setC_Id] = useState("");
    const [c_Name, setC_Name] = useState("");
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [query, setQuery] = useState("");

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data: categories, isLoading: iLCategories } = useSWR('/listcategories', fetcher);
    const { data: products, isLoading: iLProducts, mutate } = useSWR(
        `/listproduct${query == "" ? "" : `?${query}`}
        `, fetcher
    );

    useEffect(() => {
        setTitle(title)
        setSortBy(sortBy)
        setSortOrder(sortOrder)
        setC_Id(c_Id)

        setQuery(
            (title == "" ? "" : `&title=${title}`) +
            (c_Id == "" ? "" : `&category_id=${c_Id}`) +
            (sortBy == "" ? "" : `&sort_by=${sortBy}`) +
            (sortBy == "" ? "" : sortOrder == "" ? "&sort_order=asc" : `&sort_order=${sortOrder}`)
        )
    }, [title, sortBy, sortOrder, c_Id])

    function clearQuery() {
        setC_Id("");
        setSortBy("")
        setSortOrder("asc");
        setTitle("");
        setQuery("");
    }

    function handleSearchVal(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                id: "id",
                cell: info => info.getValue(),
                header: () => <span>ID Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.title,
                id: "title",
                cell: info => info.getValue(),
                header: () => <span>Nama Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.price,
                id: "price",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Harga Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.category_name,
                id: "kategori",
                cell: info => info.getValue(),
                header: () => <span>Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => action(row.id, row.title),
                id: "action",
                cell: info => info.getValue(),
                header: () => <span>Action</span>,
                footer: props => props.column.id
            }
        ]
    )

    useEffect(() => {
        mutate()
    }, [products])

    const navigate = useNavigate();

    function action(id, title) {
        return (
            <div className="flex place-content-evenly gap-x-3">
                <button
                    onClick={() => navigate(`/detailproduk/${id}`)}
                    className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Detail
                </button>
                <button
                    onClick={() => navigate(`/formproduk`, { state: { id: id } })}
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

    function handleHapus(id, title) {
        swallConfirmation(`Anda Ingin Menghapus \n${title}?`)
            .then(() => {
                axiosBackend.delete(`/deleteproduct/${id}`)
                    .then(() => {
                        swallPopUp("Data Berhasil Dihapus", "", "success");
                        mutate();
                    })
                    .catch((err) => swallPopUp("Data Gagal Dihapus", err.response?.data, "error"))
            })
            .catch(() => swallPopUp("Data Tidak Jadi Dihapus", "", "info"))

    }
    return (
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Daftar Produk</span>

            </div>
            <div className=' relative'>
                <div className=' text-lg right-10 border-4 w-fit rounded-2xl' onClick={() => navigate("/formproduk")}>
                    <Button logo={<FaPlus />}>
                        <span>Tambah Produk</span>
                    </Button>
                </div>
            </div>
            <div
                className=" absolute text-lg flex place-content-between 
                h-[5%] w-[45rem] right-[3rem] top-[10.5rem]
            ">
                <div className='flex gap-x-5 place-items-center'>
                    <div onClick={() => clearQuery()}>
                        <CategoriesButton name={"Clear All"} idActive={""} />
                    </div>
                    {
                        categories?.length <= 3 ? categories.map((item) => (
                            <div key={item.category_id} onClick={() => { setC_Id(item.category_id); setC_Name(item.category_name); }}>
                                <CategoriesButton name={item.category_name} category_id={item.category_id} idActive={c_Id} />
                            </div>
                        )) :
                            <div className='relative select-none group'>
                                <div className=' rounded-lg cursor-pointer hover:bg-red-500 hover:text-white'>
                                    {
                                        c_Id != "" ? <CategoriesButton name={c_Name} /> : <CategoriesButton name={"Kategori"} idActive={""} />
                                    }
                                </div>
                                <div className=' invisible group-hover:visible absolute top-7 h-[10rem] overflow-auto
                                z-10 p-2 border-2 bg-slate-100 rounded-2xl flex flex-col gap-y-2
                                -translate-y-7 group-hover:translate-y-0 transition-transform
                                '>
                                    {
                                        categories?.map((item) => (
                                            <div key={item.category_id} onClick={() => { setC_Id(item.category_id); setC_Name(item.category_name); }}>
                                                <CategoriesButton name={item.category_name} category_id={item.category_id} idActive={c_Id} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
                <div className=' flex place-content-between gap-x-2 place-items-center'>
                    <div className='flex gap-x-1'>
                        <span>Search Name:</span>
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
                            className='invisible group-hover:visible absolute top-8 h-fit
                            z-10 p-2 border-2 bg-slate-100 rounded-2xl flex flex-col gap-y-2
                            -translate-y-7 group-hover:translate-y-0 transition-transform
                            '>
                            <div
                                onClick={() => setSortBy("title")}
                                className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                TITLE
                            </div>
                            <div
                                onClick={() => setSortBy("price")}
                                className=' transition ease-in-out duration-500 cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                PRICE
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

            </div>
            <div>
                {
                    iLProducts ? "" :
                        <MyTable data={products} columns={columns} />
                }
            </div>

        </div>
    )
}


