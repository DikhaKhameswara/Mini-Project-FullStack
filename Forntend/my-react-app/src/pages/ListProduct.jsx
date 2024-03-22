import React, { useEffect, useMemo } from 'react';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';
import { toRupiah } from '../utils/toRupiah';

export default function ListProduct() {

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading, mutate } = useSWR("/listproduct", fetcher);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                id: "id",
                cell: info => info.getValue(),
                header: () => <span>ID Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.title,
                id: "title",
                cell: info => info.getValue(),
                header: () => <span>Nama Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.price,
                id: "price",
                cell: info => toRupiah(info.getValue()),
                header: () => <span>Harga Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.category_name,
                id: "kategori",
                cell: info => info.getValue(),
                header: () => <span>Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => action(row.id, row.title),
                id: "action",
                cell: info => info.getValue(),
                header: () => <span>Action</span>,
                footer: props => props.column.id
            }
        ]
    )

    useEffect(() => {
        mutate()
    }, [data])

    const navigate = useNavigate();

    function action(id, title) {
        return (
            <div className="flex place-content-evenly gap-x-3">
                <button
                    onClick={() => navigate(`/detailproduk/${id}`)}
                    className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Detail
                </button>
                <button
                    onClick={() => navigate(`/formproduk`, { state: { id: id } })}
                    className={`bg-slate-200 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Edit
                </button>
                <button
                    onClick={() => handleHapus(id, title)}
                    className={`bg-red-400 hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Hapus
                </button>
            </div>
        )
    }

    function handleHapus(id, title) {
        swallConfirmation(`Anda Ingin Menghapus \n${title}?`)
            .then(() => {
                axiosBackend.delete(`/deleteproduct/${id}`)
                    .then(() => {
                        swallPopUp("Data Berhasil Dihapus", "", "success");
                        mutate();
                    })
                    .catch((err) => swallPopUp("Data Gagal Dihapus", err.response?.data, "error"))
            })
            .catch(() => swallPopUp("Data Tidak Jadi Dihapus", "", "info"))

    }
    return (
        <div className=' flex flex-col pt-[2rem] px-2 w-full gap-y-[1rem]'>
            <div className=' relative flex place-content-between w-full border-b-4 border-red-700'>
                <span className=' text-5xl'>Daftar Produk</span>

            </div>
            <div className=' relative'>
                <div className=' text-lg right-10 border-4 w-fit rounded-2xl' onClick={() => navigate("/formproduk")}>
                    <Button logo={<FaPlus />}>
                        <span>Tambah Produk</span>
                    </Button>
                </div>
            </div>
            {
                isLoading ? "" :
                    <MyTable data={data} columns={columns} />
            }

        </div>
    )
}


