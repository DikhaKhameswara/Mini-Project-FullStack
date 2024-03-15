import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Checkout from '../layouts/Checkout';
import Header from '../layouts/Header';
import Products from '../layouts/Products';
import { resetCart } from '../store/reducer/cartSlice';

export default function OrderProduk() {

    const dispatch = useDispatch();
    useEffect(() => {
        if (sessionStorage.getItem("pembayaran") === "berhasil") {
            sessionStorage.removeItem("pembayaran");
            dispatch(resetCart());
        }
    }, []);

    return (
        <div className='flex gap-x-2 h-[52rem] rounded-2xl border-4 p-2'>
            <div className='w-2/3 border-4 flex flex-col gap-y-2'>
                <div className='h-[10%] p-1'>
                    <Header />
                </div>
                <div className='border-4 h-[90%]'>
                    <Products />
                </div>
            </div>
            <div className='w-1/3 border-4 h-full'>
                <Checkout />
            </div>
        </div>
    )
}
