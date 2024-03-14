import React from 'react'
import { toRupiah } from '../utils/toRupiah'

export default function Card({ image, name, price }) {
    return (
        <div className=' border-2 border-black w-full h-[15rem] rounded-2xl relative p-3'>

            <div className=''>
                {name}
            </div>
            <div className='absolute bottom-3 right-3'>
                <img src={image} alt={name} className=' w-[10rem]' />
            </div>
            <div className='absolute bottom-3'>
                {toRupiah(price)}
            </div>
        </div>
    )
}
