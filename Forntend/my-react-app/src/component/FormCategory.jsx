import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { object, string } from 'yup';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from "../utils/mySwal";
import Button from './Button';

export default function FormCategory() {

    const navigate = useNavigate();
    const loc = useLocation();
    const id = loc.state?.id;

    let dataUpdate;
    let iLUpdate = true;

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    if (id) {
        const { data: dU, isLoading: iLU } = useSWR(`/detailcategory/${id}`, fetcher);
        dataUpdate = dU;
        iLUpdate = iLU;
    }

    const schema = object().shape({
        name: string().defined().required("NAMA KATEGORI BERMASALAH")
    }).required();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    function sendRequest(data) {
        if (!id) {
            axiosBackend.post('/addcategory', data)
                .then(() => swallPopUp("Data Berhasil Ditambahkan", "", "success"))
                .catch(() => swallPopUp("Pengiriman Gagal", "Data Tidak Tersimpan", "error"))
        }
        else {
            axiosBackend.put(`/updatecategory/${id}`, data)
                .then(() => swallPopUp("Update Berhasil", "", "success"))
                .catch(() => swallPopUp("Pengiriman Gagal", "Data Tidak Tersimpan", "error"))
        }
    }

    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(dataUpdate?.category_name)
    }, [dataUpdate])

    useEffect(() => {
        setTitle(title)
    }, [title])

    const onSubmitForm = (data) => {
        data = { name: data.name.toUpperCase() };
        // schema.validate(data)
        //     .then(() => console.log("success"))
        //     .catch((err) => console.log(err));
        swallConfirmation(`Apakah Anda Ingin ${id ? `Mengupdate Kategori \n ${data.name}` : `Menambahkan Kategori \n ${data.name} `} `)
            .then(() => {
                sendRequest(data);
                reset();
                setTitle("")
            })
            .catch(() => swallPopUp("Proses Dibatalkan", "", "info"))
        // console.log(coba.toUpperCase())
    }


    return ((id && iLUpdate) ? "" :
        <div className='p-[2rem] flex flex-col gap-y-[3rem] w-full h-[53rem]'>
            <div className=' border-b-4 border-red-700 relative'>
                <span className=' text-7xl'>Form Kategori</span>
                <div className=' absolute bottom-3 right-3' onClick={() => navigate("/listkategori")}>
                    <Button>
                        Back
                    </Button>
                </div>
            </div>
            <div className=' flex w-full h-full'>
                <div className=' w-[50%]'>
                    <div className=' w-[50rem] ml-[5rem]'>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className=' flex flex-col w-full place-content-start h-[7rem] relative'>
                                <span className='w-[60%] text-3xl'>Nama Kategori</span>
                                <input type='text' {...register("name")}
                                    placeholder='Masukkan Nama Kategori'
                                    // defaultValue={dataUpdate && dataUpdate.category_name}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='border-2 border-blue-300 w-full rounded-lg px-1 h-[3rem] text-xl' />
                                <span className=" text-red-500 absolute bottom-0 right-0">{errors?.name?.message}</span>
                            </div>
                            <Button type={"submit"}>
                                {
                                    id ? "Edit Kategori" : "Tambah Kategori"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
