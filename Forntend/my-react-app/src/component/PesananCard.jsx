import React from 'react'
import { toRupiah } from '../utils/toRupiah'

export default function PesananCard({ image, name, price, subtotal, quantity }) {
    return (
        <div className=' w-full border-4 h-60 rounded-3xl p-3 relative flex gap-x-3'>
            <div className=' w-1/5'>
                <img src={image} className='h-[13rem] rounded-xl' alt="" />
            </div>
            <div className=' relative w-4/5'>
                <div className=' text-3xl text-wrap h-2/3'>
                    {name}
                </div>
                <div className=' absolute bottom-2 left-2'>
                    <div>
                        Quantity: {quantity}
                    </div>
                    <div>
                        {toRupiah(price)}
                    </div>
                </div>
                <div className=' absolute bottom-2 right-2 text-2xl'>
                    {toRupiah(subtotal)}
                </div>
            </div>
        </div>
    )
}
