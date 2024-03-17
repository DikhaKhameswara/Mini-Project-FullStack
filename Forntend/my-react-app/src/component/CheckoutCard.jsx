import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { deleteBarang, setQuantity } from '../store/reducer/cartSlice';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';
import { toRupiah } from '../utils/toRupiah';




function handleLengthName(name) {
    if (name.length > 25) {
        return name.slice(0, 25) + "..."
    }
    else {
        return name
    }
}

function removeBarangFromCart(id, name, dispatch) {
    swallConfirmation(`Apakah Kamu Ingin Menghapus ${name}?`)
        .then(() => {
            dispatch(deleteBarang(id));
            swallPopUp("Barang Berhasil Dihapus", "", "success");
        })
        .catch(() => swallPopUp("Barang Tidak Jadi Dihapus", "", "info"));
}

function quantity(id, qty, name, dispatch) {
    return (
        <div className='flex flex-row gap-x-2 place-items-center'>
            {
                qty == 1 ?
                    <div className=' cursor-pointer' onClick={() => removeBarangFromCart(id, name, dispatch)}><FaRegTrashAlt /></div>
                    :
                    <div className=' cursor-pointer' onClick={() => dispatch(setQuantity({ id, increment: false }))}><FiMinusCircle /></div>
            }
            <div className=''>{qty}</div>
            <div className=' cursor-pointer' onClick={() => dispatch(setQuantity({ id, increment: true }))}><FiPlusCircle /></div>
        </div>
    )
}


export default function CheckoutCard({ name, price, qty, subTotal, id }) {
    const dispatch = useDispatch();
    return (
        <div className=' border-4 border-black h-20 mb-3 rounded-lg p-1 relative select-none'>
            <div className=' text-lg'>
                {handleLengthName(name)}
            </div>
            <div className=' absolute bottom-1 left-1 text-[12px]'>
                {toRupiah(price)}
            </div>
            <div className=' flex place-content-center'>
                {quantity(id, qty, name, dispatch)}
            </div>
            <div className=' absolute bottom-1 right-1'>
                {toRupiah(subTotal)}
            </div>
            <div className=' absolute top-1 right-1' onClick={() => removeBarangFromCart(id, name, dispatch)}>
                <FaRegTrashAlt className=' cursor-pointer' />
            </div>
        </div>
    )
}
