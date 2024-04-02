import React, { useEffect, useState } from 'react';
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { ImSad } from "react-icons/im";
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import CategoriesButton from '../component/CategoriesButton';
import ProductCard from '../component/ProductCard';
import { addBarang } from '../store/reducer/cartSlice';
import { axiosBackend } from '../utils/axios';

export default function ProductsCopy() {

    const [c_Id, setC_Id] = useState("");
    const [c_Name, setC_Name] = useState("");
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data: categories, isLoading: iLCategories } = useSWR('/listcategories', fetcher);
    const { data: products, isLoading: iLProducts } = useSWR(
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

    function handleClickAddBarang(item) {
        const barang = {
            ...item,
            qty: 1,
            subtotal: item.price
        }
        dispatch(addBarang(barang));
    }

    return (categories == undefined ? "" :
        <div className=' h-full w-full flex flex-col gap-y-2'>
            <div className=' text-lg flex place-content-between w-full h-[5%]'>
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
                                        categories.map((item) => (
                                            <div key={item.category_id} onClick={() => { setC_Id(item.category_id); setC_Name(item.category_name); }}>
                                                <CategoriesButton name={item.category_name} category_id={item.category_id} idActive={c_Id} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
                <div className=' flex place-content-between w-[40%] place-items-center'>
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
            <div className='w-full h-[93%] flex place-content-center'>
                {products == undefined || categories == undefined ? <span>Waduh Ada Masalah</span> :
                    products == 0 ?
                        <div className=' flex place-items-center justify-center text-7xl h-full'>
                            Produk Tidak Ditemukan &nbsp; <ImSad />
                        </div>
                        : <div
                            className="
                            grid grid-cols-3 place-content-start gap-3
                            w-full h-full overflow-auto
                            
                            ">
                            {
                                products.map((item) => (
                                    <div key={item.id} className=' cursor-pointer' onClick={() => handleClickAddBarang(item)}>
                                        <ProductCard name={item.title} image={item.image} price={item.price} />
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}
