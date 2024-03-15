import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { toRupiah } from '../utils/toRupiah';

export default function ListProduct() {

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading } = useSWR("/listproduct", fetcher);

    const navigate = useNavigate();
    return (
        <div className=' flex flex-col p-[2%] w-full gap-y-[3rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-black'>
                <span className=' text-5xl'>Daftar Produk</span>
                <div className='' onClick={() => navigate("/")}>
                    <Button>Back</Button>
                </div>
            </div>
            <div className=' flex place-content-center'>
                {
                    isLoading ? "" :
                        <table className="text-left w-full text-xl">
                            <thead className="bg-black text-white w-full">
                                <tr className="flex w-full h-[3rem] place-items-center">
                                    <th className="p-2 w-[19.79%] border-y-2">ID Produk</th>
                                    <th className="p-2 w-[19.79%] border-y-2">Nama Produk</th>
                                    <th className="p-2 w-[19.79%] border-y-2">Harga Satuan</th>
                                    <th className="p-2 w-[19.79%] border-y-2">Kategori</th>
                                    <th className="p-2 w-[19.79%] border-y-2 flex place-content-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className=" flex flex-col items-center justify-between overflow-auto w-full h-[60vh]">
                                {
                                    data.map((item) => (
                                        <tr key={item.id} className=' flex place-items-center w-full'>
                                            <td className=' p-1 pl-2 w-[20%] border-y-2 h-[4rem] flex place-items-center'>{item.id}</td>
                                            <td className=' p-1 pl-2 w-[20%] border-y-2 h-[4rem] flex place-items-center'>{item.title}</td>
                                            <td className=' p-1 pl-2 w-[20%] border-y-2 h-[4rem] flex place-items-center'>{toRupiah(item.price)}</td>
                                            <td className=' p-1 pl-2 w-[20%] border-y-2 h-[4rem] flex place-items-center' >{item.category_name}</td>
                                            <td className=' p-1 pl-2 w-[20%] border-y-2 h-[4rem] grid grid-flow-col place-content-around text-sm' >
                                                <span><Button>Detail</Button></span>
                                                <span><Button>Edit</Button></span>
                                                <span><Button>Hapus</Button></span>
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
