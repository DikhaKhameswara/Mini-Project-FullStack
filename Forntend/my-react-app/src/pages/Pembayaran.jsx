import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import PesananCard from '../component/PesananCard';
import { resetCart } from '../store/reducer/cartSlice';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';
import { toRupiah } from '../utils/toRupiah';

export default function Pembayaran() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [totalPay, setTotalPay] = useState(0);
    const [kembalian, setKembalian] = useState(0);

    const cart = useSelector((state) => state.cart);

    let totalAmount = 0;
    cart.map(item => totalAmount += item.subtotal);

    useEffect(() => {
        setKembalian(totalPay - totalAmount);
    }, [totalPay])

    function tP(value) {
        if (value != "") {
            const num = Number.parseInt(value);
            setTotalPay(num);
        } else {
            setTotalPay(0);
        }
    }

    function bayar() {

        if (kembalian < 0 || totalPay.toString() == NaN.toString()) {
            return swallPopUp("Pembayaran Dibatalkan", "Uang Tidak Cukup", "warning");
        }

        let tDList = [];
        for (const item of cart) {
            const tD = {
                product_id: item.id,
                quantity: item.qty,
                subtotal: item.subtotal
            };
            tDList.push(tD);
        }
        const request = {
            total_amount: totalAmount,
            total_pay: totalPay,
            transaction_details: tDList
        }

        swallConfirmation("Apakah Anda Ingin Melakukan Pembayaran Ini?")
            .then(() => {
                axiosBackend.post("/addtransaction", request)
                    .then((res) => {
                        swallPopUp("Pembayaran Tuntas", "SUCCESS", "success")
                            .then(() => {
                                navigate("/");
                                dispatch(resetCart());
                            })
                    })
                    .catch((err) => {
                        swallPopUp("Pembayaran Gagal", err.response?.data, "error");
                    })
            })
            .catch(() => swallPopUp("Pembayaran Dibatalkan", "", "info"));
    }

    return (
        <div className='flex h-svh gap-x-2'>
            <div className=' border-4 rounded-xl w-3/5 p-2 h-full flex flex-col place-content-between relative'>
                <div className=' border-b-4 border-red-700 relative h-[5rem]'>
                    <div className=' absolute' onClick={() => navigate("/")}>
                        <Button>
                            Back
                        </Button>
                    </div>
                    <div className=' text-5xl m-5 absolute right-5'>
                        Rincian Pesanan
                    </div>
                </div>
                <div className=' h-[43rem] overflow-auto flex flex-col gap-y-3 rounded-3xl'>
                    {
                        cart.map((item) => (
                            <PesananCard key={item.id} name={item.title} image={item.image} price={item.price} quantity={item.qty} subtotal={item.subtotal} />
                        ))
                    }
                </div>
            </div>
            <div className=' border-4 w-2/5 flex flex-col place-items-center gap-y-9 relative p-7 rounded-xl'>
                <div className=' text-5xl border-b-4 border-red-700 p-1'>
                    Pembayaran
                </div>
                <div className=' text-4xl mt-9 flex place-content-between w-full'>
                    <span>Total:</span>
                    <span>{toRupiah(totalAmount)}</span>
                </div>
                <div className=' text-4xl mt-9 w-full flex place-content-between place-items-center gap-x-5'>
                    <span>Dibayar</span>
                    <CurrencyInput
                        id="input-example"
                        name="input-name"
                        prefix='Rp.'
                        placeholder="Please enter a number"
                        decimalsLimit={2}
                        onValueChange={(value, name, values) => tP(value)}
                        className=' border-2 border-black'
                    />

                </div>
                <div className=' text-4xl mt-9 w-full flex place-content-between'>
                    <span>Kembalian: </span>
                    <span>{kembalian < 0 ? "-" : toRupiah(kembalian)}</span>
                </div>
                <div onClick={() => bayar()} className=' absolute w-[90%] bottom-5 p-5 text-3xl h-[5rem] flex gap-x-2 place-content-center rounded-xl bg-green-400 active:bg-green-600 hover:scale-105 select-none cursor-pointer place-items-center'>
                    <HiOutlineShoppingCart />
                    <span>Pembayaran</span>
                </div>
            </div>
        </div>
    )
}
