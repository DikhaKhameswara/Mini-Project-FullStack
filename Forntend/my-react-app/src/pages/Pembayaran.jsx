import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../component/Button';
import PesananCard from '../component/PesananCard';
import { axiosBackend } from '../utils/axios';
import { toRupiah } from '../utils/toRupiah';

export default function Pembayaran() {

    const navigate = useNavigate();

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

    function popUp(data, message, icon) {
        Swal.fire({
            title: data,
            text: message,
            icon: icon
        });
    }

    function bayar() {

        if (kembalian < 0 || totalPay.toString() == NaN.toString()) {
            return popUp("Pembayaran Dibatalkan", "Uang Tidak Cukup", "error");
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
        axiosBackend.post("/addtransaction", request)
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem("pembayaran", "berhasil");
                popUp(res.data?.data, res.data?.message, "success");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                popUp("Error", "message", "error")
            })


    }

    return (
        <div className='flex h-[52rem] p-2 gap-x-2'>
            <div className=' border-4 w-3/5 p-2 h-full relative'>
                <div className=' absolute' onClick={() => navigate("/")}>
                    <Button>
                        Back
                    </Button>
                </div>
                <div className=' text-5xl m-5 absolute right-5'>
                    Rincian Pesanan
                    <hr />
                </div>
                <div className=' h-[43rem] overflow-auto grid grid-flow-row gap-y-3 mt-[5rem] rounded-3xl'>
                    {
                        cart.map((item) => (
                            <PesananCard key={item.id} name={item.title} image={item.image} price={item.price} quantity={item.qty} subtotal={item.subtotal} />
                        ))
                    }
                </div>
            </div>
            <div className=' border-4 w-2/5 flex flex-col place-items-center gap-y-9 relative p-7'>
                <div className=' text-5xl'>
                    Pembayaran
                    <hr />
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
