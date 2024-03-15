import React from 'react';
import { AiFillFire } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutCard from '../component/CheckoutCard';
import { Swall } from '../utils/Swall';
import { toRupiah } from '../utils/toRupiah';



export default function Checkout() {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    let totalAmount = 0;
    cart.map(item => totalAmount += item.subtotal);

    function handlePembayaran() {

        // Swall()
        navigate("/pembayaran");
    }
    return (
        <div className=' flex flex-col relative h-full'>
            <div className=' text-5xl mb-[5rem] flex gap-x-2 place-items-center place-content-center h-[10%]'>
                <span>Pesananmu Kawann</span> <AiFillFire className=' text-red-500' />
            </div>
            <div className='h-[30rem] overflow-auto border-2 border-gray-500 rounded-lg p-2'>
                {cart.length == 0 ?
                    <div className=' text-xl flex place-content-center place-items-center h-full'>
                        Belum Ada Produk Yang Ditambahkan <BiSmile />
                    </div>
                    : cart.map((item) => (
                        <CheckoutCard key={item.id} id={item.id} name={item.title} qty={item.qty} price={item.price} subTotal={item.subtotal} />
                    ))
                }
            </div>
            <div className='absolute bottom-0 w-full'>
                <div className=' p-5 text-2xl flex place-content-between'>
                    <div>
                        Total:
                    </div>
                    <div>
                        {
                            toRupiah(totalAmount)
                        }
                    </div>
                </div>
                <div className=' text-3xl h-[5rem] border-4 mx-3 my-1 grid place-content-center rounded-xl bg-green-400 active:bg-green-600 hover:scale-105 select-none cursor-pointer' onClick={() => handlePembayaran()}>
                    Pembayaran
                </div>
            </div>
        </div>
    )
}
