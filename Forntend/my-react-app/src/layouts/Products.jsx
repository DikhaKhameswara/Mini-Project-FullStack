import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import CategoriesButton from '../component/CategoriesButton';
import ProductCard from '../component/ProductCard';
import { addBarang } from '../store/reducer/cartSlice';
import { axiosBackend } from '../utils/axios';

export default function Products() {

    const [c_Id, setC_Id] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");

    const dispatch = useDispatch();



    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data.data);
    const { data: categories, isLoading: iLCategories } = useSWR('/listcategories', fetcher);
    const { data: products, isLoading: iLProducts } = useSWR(`/listproduct?${c_Id + '&' + name}`, fetcher);

    useEffect(() => {
        if (title == "") {
            setName("");
        }
        else {
            setName(`title=${title}`)
        }
    }, [title])

    function handleSearchVal(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }


    function handleClickCategory(id) {
        setC_Id(`category_id=${id}`)
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
        <div className=' h-full flex flex-col gap-y-2'>
            <div className=' text-lg flex place-content-between'>
                <div className='flex gap-x-5'>
                    <div onClick={() => setC_Id("")}>
                        <CategoriesButton name={"All"} />
                    </div>
                    {
                        categories.map((item) => (
                            <div key={item.category_id} onClick={() => handleClickCategory(item.category_id)}>
                                <CategoriesButton name={item.category_name} category_id={item.category_id} idActive={c_Id} />
                            </div>
                        ))
                    }
                </div>
                <div className=' flex gap-x-5'>
                    <div className='flex gap-x-1'>
                        <span>Search Name:</span>
                        <input type="text" className='border-2 border-black px-1' onChange={(e) => handleSearchVal(e)} value={title} />
                    </div>
                    <div>
                        sorting
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
