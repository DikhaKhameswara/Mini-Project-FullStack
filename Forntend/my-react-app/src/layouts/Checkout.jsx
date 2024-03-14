import React from 'react';
import { BiSmile } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutCard from '../component/CheckoutCard';
import { toRupiah } from '../utils/toRupiah';

export default function Checkout() {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    console.log(cart);

    let totalAmount = 0;
    cart.map(item => totalAmount += item.subtotal);

    function handlePembayaran() {
        if (cart.length != 0) {
            navigate("/pembayaran");
        }
    }
    return (
        <div className=' flex flex-col relative h-full'>
            <div className=' text-2xl mb-[5rem]'>
                Pesananmu Kawann
            </div>
            <div className='max-h-[30rem] overflow-auto border-2 border-gray-500 rounded-lg p-2'>
                {cart.length == 0 ?
                    <div className=' text-xl flex place-content-center place-items-center'>
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
                <div className=' text-3xl h-[5rem] border-4 m-5 grid place-content-center rounded-xl bg-green-400 active:bg-green-600 hover:scale-105 select-none cursor-pointer' onClick={() => handlePembayaran()}>
                    Pembayaran
                </div>
            </div>
        </div>
    )
}
