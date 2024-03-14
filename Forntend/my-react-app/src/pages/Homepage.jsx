import React from 'react';
import Checkout from '../layouts/Checkout';
import Header from '../layouts/Header';
import Products from '../layouts/Products';

export default function Homepage() {

    return (
        <div className='flex gap-x-2 h-[52rem] rounded-2xl border-4 p-2'>
            <div className='w-2/3 border-4 flex flex-col gap-y-2'>
                <div className='h-[10%]'>
                    <Header />
                </div>
                <div className='border-4 h-[90%]'>
                    <Products />
                </div>
            </div>
            <div className='w-1/3 border-4'>
                <Checkout />
            </div>
        </div>
    )
}
