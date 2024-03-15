import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';
import { handleUrl } from '../utils/handleUrl';
import { toRupiah } from '../utils/toRupiah';

export default function DetailProduk() {
    const params = useParams();

    const navigate = useNavigate();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading } = useSWR(`/detailproduct/${params.id}`, fetcher);

    return (isLoading ? "" :
        <div className=' flex flex-col m-5 gap-y-3 w-full'>
            <div className=' relative text-5xl flex place-content-center'>
                Detail Produk
                <div className=' absolute text-lg right-10' onClick={() => navigate("/admin")}>
                    <Button>
                        Back
                    </Button>
                </div>
            </div>
            <div className=' relative mx-[2%]'>
                <hr className=' border-4 border-red-900 mb-7' />
            </div>
            <div className=' flex place-content-around w-[95%] h-[35rem]'>
                <div className='mb-[1rem] p-1 h-full w-[45%]'>
                    <table className=' text-left text-3xl h-[70%] grid grid-flow-row gap-y-5'>
                        <tr>
                            <th className=' w-[15rem]'>ID </th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{data?.id}</td>
                        </tr>
                        <tr className=''>
                            <th className=' w-[15rem] text-nowrap'>Nama Produk</th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{data?.title}</td>
                        </tr>
                        <tr className=''>
                            <th className=' w-[15rem] text-nowrap'>Harga Satuan</th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{toRupiah(data?.price)}</td>
                        </tr>
                        <tr className=''>
                            <th className=' w-[15rem] text-nowrap'>URL Gambar</th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{handleUrl(data?.image)}</td>
                        </tr>
                        <tr className=''>
                            <th className=' w-[15rem] text-nowrap'>ID Kategori</th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{data?.category_id}</td>
                        </tr>
                        <tr className=''>
                            <th className=' w-[15rem] text-nowrap'>Nama Kategori</th>
                            <td className=' w-[1rem] text-right'>:</td>
                            <td className=' text-left text-2xl pl-3'>{data?.category_name}</td>
                        </tr>
                    </table>
                </div>
                <div className=' w-[30%]'>
                    <img src={data?.image} alt={data?.title} className=' w-full rounded-2xl' />
                </div>
            </div>

        </div>
    )
}
