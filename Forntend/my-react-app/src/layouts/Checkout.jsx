import React from 'react';
import { AiFillFire } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutCard from '../component/CheckoutCard';
import { resetCart } from '../store/reducer/cartSlice';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';
import { toRupiah } from '../utils/toRupiah';



export default function Checkout() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    let totalAmount = 0;
    cart.map(item => totalAmount += item.subtotal);

    function removeBarangFromCart() {
        swallConfirmation("Apakah Anda Ingin Menghapus Semua Barang Di Cart?")
            .then(() => {
                swallPopUp("Semua Barang Berhasil Dihapus", "", "success");
                dispatch(resetCart());
            })
            .catch(() => swallPopUp("Barang Tidak Jadi Dihapus", "", "info"));
    }

    console.log(cart)

    return (
        <div className=' flex flex-col relative h-full w-full'>
            <div className=' text-5xl mb-[2rem] flex gap-x-2 place-items-center place-content-center h-[5rem]'>
                <span>Pesananmu Kawann</span>
                <AiFillFire className=' text-red-500' />
            </div>
            <div className='w-full flex place-content-end h-[3.5rem] mb-1 relative'>
                {
                    cart?.length == 0 ? "" :
                        <button
                            onClick={() => removeBarangFromCart()}
                            className=' bg-red-300 hover:bg-red-500 active:bg-red-700 active:text-white rounded-xl absolute right-2 h-[3rem] p-2 font-medium flex place-items-center gap-x-2'>
                            <FaRegTrashAlt />Hapus Semua Barang
                        </button>
                }

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
                <div onClick={() => navigate("/pembayaran")}
                    className=' text-3xl h-[5rem] border-4 mx-3 my-1 grid place-content-center rounded-xl bg-green-400 active:bg-green-600 hover:scale-105 select-none cursor-pointer'>
                    Pembayaran
                </div>
            </div>
        </div>
    )
}
