import React, { useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';

export default function ListCategories() {

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading, mutate } = useSWR("/listcategories", fetcher);

    useEffect(() => {
        mutate()
    }, [data])

    const navigate = useNavigate();

    function handleHapus(id, title) {
        swallConfirmation(`Anda Ingin Menghapus \n${title}?`)
            .then(() => {
                axiosBackend.delete(`/deletecategory/${id}`)
                    .then(() => {
                        swallPopUp("Data Berhasil Dihapus", "", "success");
                        mutate();
                    })
                    .catch(() => swallPopUp("Data Gagal Dihapus", "", "error"))
            })
            .catch(() => swallPopUp("Data Tidak Jadi Dihapus", "", "info"))

    }
    return (
        <div className=' flex flex-col p-[2%] w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-black'>
                <span className=' text-5xl'>Daftar Kategori</span>
                <div className=' w-fit' onClick={() => navigate("/")}>
                    <Button>Back</Button>
                </div>
            </div>
            <div className=' text-lg right-10 border-4 w-fit rounded-2xl' onClick={() => navigate("/formkategori")}>
                <Button logo={<FaPlus />}>
                    <span>Tambah Kategori</span>
                </Button>
            </div>
            <div className=' flex place-content-center'>
                {
                    isLoading ? "" :
                        <table className="text-left w-full text-xl">
                            <thead className="bg-black text-white w-full">
                                <tr className="flex w-full h-[3rem] place-items-center">
                                    <th className="p-2 w-[25%] border-y-2">ID Kategori</th>
                                    <th className="p-2 w-[25%] border-y-2">Nama Kategori</th>
                                    <th className="p-2 w-[25%] border-y-2">Jumlah Produk</th>
                                    <th className="p-2 w-[25%] border-y-2 flex place-content-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className=" flex flex-col items-center overflow-auto w-full h-[60vh]">
                                {
                                    data.map((item) => (
                                        <tr key={item.category_id} className=' flex place-items-center w-full border-y-2 min-h-[4rem]'>
                                            <td className=' p-1 pl-2 w-[25%] flex place-items-center'>{item.category_id}</td>
                                            <td className=' p-1 pl-2 w-[25%] flex place-items-center'>{item.category_name}</td>
                                            <td className=' p-1 pl-2 w-[25%] flex place-items-center'>{item.total_products}</td>
                                            <td className=' text-sm w-[25%] flex place-content-evenly gap-x-3' >
                                                <button
                                                    onClick={() => navigate(`/detailkategori/${item.category_id}`)}
                                                    className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/formkategori`, { state: { id: item.category_id } })}
                                                    className={`bg-slate-200 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleHapus(item.category_id, item.category_name)}
                                                    className={`bg-red-400 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }

            </div>
        </div>
    )
}
