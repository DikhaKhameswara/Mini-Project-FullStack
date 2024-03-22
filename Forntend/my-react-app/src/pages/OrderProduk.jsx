import React from 'react';
import Checkout from '../layouts/Checkout';
import Header from '../layouts/Header';
import Products from '../layouts/Products';

export default function OrderProduk() {

    return (
        <div className='flex gap-x-2 h-svh rounded-2xl border-4'>
            <div className='w-2/3 flex flex-col gap-y-2 p-2'>
                <div className='h-[10%] p-1 border-b-4 border-red-700'>
                    <Header />
                </div>
                <div className=' h-[90%] w-full'>
                    <Products />
                </div>
            </div>
            <div className='w-1/3 border-l-4 border-red-700 h-full flex place-content-center p-1'>
                <Checkout />
            </div>
        </div>
    )
}
