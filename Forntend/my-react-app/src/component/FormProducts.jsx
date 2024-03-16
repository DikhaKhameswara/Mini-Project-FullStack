import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { axiosBackend } from '../utils/axios';
import Button from './Button';

export default function FormProducts() {

    const navigate = useNavigate();
    const loc = useLocation();
    const id = loc.state?.id;

    let dataUpdate;
    let iLUpdate = true;

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    if (id) {
        const { data: dU, isLoading: iLU } = useSWR(`/detailproduct/${id}`, fetcher);
        dataUpdate = dU;
        iLUpdate = iLU;

    }
    const { data: categories, isLoading: iLCategories } = useSWR("/listcategories", fetcher);

    const { register, handleSubmit, setValue } = useForm();
    // const { onChange: oCPrice, name: price, ref: refPrice, onBlur: oBPrice } = register('price');
    register('price');
    register('image');

    const [previewImage, setPreviewImage] = useState("");


    useEffect(() => {
        setPreviewImage(dataUpdate?.image);
        setValue("title", dataUpdate?.title);
        setValue("image", dataUpdate?.image);
        setValue("price", dataUpdate?.price);
        setValue("category_id", dataUpdate?.category_id);
    }, [dataUpdate])


    useEffect(() => {
        setPreviewImage(previewImage);
    }, [previewImage])

    function handleImage(url) {
        setPreviewImage(url);
        setValue("image", url);
    }

    const onSubmitForm = (data) => {
        console.log(data);
    }


    return ((id && iLCategories) || (id && iLUpdate) ? "" :
        <div className='p-[2rem] flex flex-col gap-y-[3rem] w-full h-[53rem]'>
            <div className=' border-b-4 border-red-700 relative'>
                <span className=' text-7xl'>Form Produk</span>
                <div className=' absolute bottom-3 right-3' onClick={() => navigate("/admin")}>
                    <Button>
                        Back
                    </Button>
                </div>
            </div>
            <div className=' flex w-full h-full'>
                <div className=' w-[50%]'>
                    <div className=' w-[50rem] ml-[5rem]'>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className=' flex flex-col w-full place-content-start h-[7rem]'>
                                <span className='w-[60%] text-3xl'>Nama Produk</span>
                                <input type='text' {...register("title")}
                                    placeholder='Masukkan Nama Produk'
                                    defaultValue={dataUpdate && dataUpdate.title}
                                    className='border-2 border-blue-300 w-full rounded-lg px-1 h-[3rem] text-xl' />
                            </div>
                            <div className=' flex flex-col w-full place-content-start h-[7rem]'>
                                <span className='w-[60%] text-3xl'>URL Gambar</span>
                                <input type='text'
                                    placeholder='Masukkan URL Gambar Produk'
                                    defaultValue={dataUpdate && dataUpdate.image}
                                    onChange={(e) => handleImage(e.target.value)}
                                    className='border-2 border-blue-300 w-full rounded-lg px-1 h-[3rem] text-xl text-ellipsis' />
                            </div>
                            <div className=' flex flex-col w-full place-content-start h-[7rem]'>
                                <span className='w-[60%] text-3xl'>Harga Satuan</span>
                                <CurrencyInput
                                    id="price"
                                    name='price'
                                    prefix='Rp.'
                                    // onChange={tesss}
                                    placeholder="Masukkan Harga Produk"
                                    decimalsLimit={0}
                                    defaultValue={dataUpdate && dataUpdate?.price}
                                    onValueChange={(value, names, values) => setValue("price", values.float)}
                                    className='border-2 border-blue-300 w-full rounded-lg px-1 h-[3rem] text-xl'
                                />
                            </div>
                            <div className=' flex flex-col w-full place-content-start h-[7rem]'>
                                {
                                    iLCategories ? "" :
                                        <div className='flex flex-col w-full h-full'>
                                            <span className='w-[60%] text-3xl'>Kategori Produk</span>
                                            <select id='category_id'
                                                {...register("category_id")}
                                                defaultValue={dataUpdate && dataUpdate.category_id}
                                                className=' text-xl border-2 border-blue-300 rounded-lg h-[3rem] w-full'>
                                                {
                                                    categories.map((item) => (
                                                        <option key={item.category_id}
                                                            value={Number.parseInt(item.category_id)}>
                                                            {
                                                                item.category_name
                                                            }
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                }

                            </div>

                            <Button type={"submit"}>
                                {
                                    id ? "Edit Produk" : "Tambah Produk"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
                <div className=' w-[50%] h-full flex place-content-center'>
                    <img src={previewImage} alt="" className=' h-[30rem]' />
                </div>
            </div>

        </div>
    )
}
