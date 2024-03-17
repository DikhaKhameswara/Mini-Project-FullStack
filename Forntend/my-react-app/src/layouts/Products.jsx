import React, { useEffect, useState } from 'react';
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import CategoriesButton from '../component/CategoriesButton';
import ProductCard from '../component/ProductCard';
import { addBarang } from '../store/reducer/cartSlice';
import { axiosBackend } from '../utils/axios';

export default function Products() {

    const [showDropdown, setShowDropdown] = useState(false);

    const [c_Id, setC_Id] = useState("");
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [query, setQuery] = useState("");

    const [q2, setQ2] = useState({
        category_id: "",
        title: "",
        sort_order: "",
        sort_by: "",
    });

    const dispatch = useDispatch();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data: categories, isLoading: iLCategories } = useSWR('/listcategories', fetcher);
    const { data: products, isLoading: iLProducts } = useSWR(`/listproduct${query}`, fetcher);

    useEffect(() => {
        setTitle("")
        setSortBy("")
        if (c_Id == "") {
            setC_Id("");
            setQuery("");
        }
        else {
            setC_Id(c_Id);
            setQuery(`?category_id=${c_Id}`);
        }

    }, [c_Id])

    useEffect(() => {
        setC_Id("");
        if (title == "") {
            setTitle("")
            setQuery("")
        }
        else {
            setTitle(title)
            if (sortBy != "") {
                setQuery(`?title=${title}&sort_by=${sortBy}&sort_order=${sortOrder}`)
            }
            else {
                setQuery(`?title=${title}`)
            }
        }
    }, [title])

    useEffect(() => {
        setC_Id("");
        if (sortBy == "") {
            setSortBy("")
            setSortOrder("")
        }
        else {
            setSortBy(sortBy);
            setSortOrder(sortOrder);
            if (title != "") {
                setQuery(`?title=${title}&sort_by=${sortBy}&sort_order=${sortOrder}`)
            }
            else {
                setQuery(`?sort_by=${sortBy}&sort_order=${sortOrder}`)
            }
        }
    }, [sortBy, sortOrder])

    console.log(query)

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

    function clearQuery() {
        setC_Id("");
        setSortBy("")
        setSortOrder("");
        setTitle("");
        setQuery("");
    }

    return (categories == undefined ? "" :
        <div className=' h-full flex flex-col gap-y-2'>
            <div className=' text-lg flex place-content-between'>
                <div className='flex gap-x-5'>
                    <div onClick={() => clearQuery()}>
                        <CategoriesButton name={"Clear All"} idActive={""} />
                    </div>
                    {
                        categories.map((item) => (
                            <div key={item.category_id} onClick={() => setC_Id(item.category_id)}>
                                <CategoriesButton name={item.category_name} category_id={item.category_id} idActive={c_Id} />
                            </div>
                        ))
                    }
                </div>
                <div className=' flex w-[30rem] place-content-between'>
                    <div className='flex gap-x-1'>
                        <span>Search Name:</span>
                        <input
                            type="text"
                            className='border-2 border-black px-1'
                            onChange={(e) => handleSearchVal(e)} value={title} />
                    </div>
                    <div className='relative select-none ' onClick={() => setShowDropdown(!showDropdown)}>
                        <div className=' border-2 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white'>
                            {
                                sortBy == "" ? <span>SORTING</span> : sortBy.toUpperCase()
                            }
                        </div>
                        {
                            showDropdown ?
                                <div className=' absolute top-9 h-fit z-10 p-2 border-2 bg-slate-100 rounded-2xl flex flex-col gap-y-2'>
                                    <div
                                        onClick={() => setSortBy("title")}
                                        className=' cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                        TITLE
                                    </div>
                                    <div
                                        onClick={() => setSortBy("price")}
                                        className=' cursor-pointer border-2 bg-slate-200 p-1 rounded-xl hover:bg-red-500 hover:text-white'>
                                        PRICE
                                    </div>
                                </div>
                                :
                                ""
                        }
                    </div>
                    <div
                        onClick={() => sortOrder == "asc" ? setSortOrder("desc") : setSortOrder("asc")}
                        className=' border-2 cursor-pointer select-none rounded-lg hover:bg-red-500 hover:text-white text-3xl'>
                        {
                            sortOrder == "desc" ? <HiOutlineSortDescending /> : <HiOutlineSortAscending />
                        }
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-3 gap-2 overflow-y-auto'>
                {products == undefined || categories == undefined ? "" :
                    products.map((item) => (
                        <div key={item.id} className=' cursor-pointer' onClick={() => handleClickAddBarang(item)}>
                            <ProductCard name={item.title} image={item.image} price={item.price} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
