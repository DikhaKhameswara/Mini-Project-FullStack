import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import { axiosBackend } from '../utils/axios';

export default function DetailKategori() {
    const params = useParams();

    const navigate = useNavigate();

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading } = useSWR(`/detailcategory/${params.id}`, fetcher);

    return (isLoading ? "" :
        <div className=' flex flex-col m-5 gap-y-3 w-full'>
            <div className=' relative text-5xl flex place-content-center'>
                Detail Kategori
                <div className=' absolute text-lg right-10' onClick={() => navigate("/listkategori")}>
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
                        <tbody>
                            <tr className='flex flex-row'>
                                <th className=' w-[19rem]'>ID Kategori</th>
                                <td className=' w-[1rem] text-right'>:</td>
                                <td className=' text-left text-2xl pl-3 flex place-items-center'>{data?.category_id}</td>
                            </tr>
                            <tr className='flex flex-row'>
                                <th className=' w-[19rem] text-nowrap'>Nama Kategori</th>
                                <td className=' w-[1rem] text-right'>:</td>
                                <td className=' text-left text-2xl pl-3 flex place-items-center'>{data?.category_name}</td>
                            </tr>
                            <tr className='flex flex-row'>
                                <th className=' w-[19rem] text-nowrap'>Jumlah Produk Terkait</th>
                                <td className=' w-[1rem] text-right'>:</td>
                                <td className=' text-left text-2xl pl-3 flex place-items-center'>{data?.total_products}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=' w-[30%]'>
                    <img src={data?.image} alt={data?.title} className=' w-full rounded-2xl' />
                </div>
            </div>

        </div>
    )
}
