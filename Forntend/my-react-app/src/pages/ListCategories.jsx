import React, { useEffect, useMemo } from 'react';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Button from '../component/Button';
import MyTable from '../component/MyTable';
import { axiosBackend } from '../utils/axios';
import { swallConfirmation, swallPopUp } from '../utils/mySwal';

export default function ListCategories() {

    const fetcher = (url) => axiosBackend.get(url).then((res) => res.data);
    const { data, isLoading, mutate } = useSWR("/listcategories", fetcher);

    useEffect(() => {
        mutate()
    }, [data])

    const columns = useMemo(
        () => [
            {
                accessorFn: row => row.category_id,
                id: "category_id",
                cell: info => info.getValue(),
                header: () => <span>ID Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.category_name,
                id: "category_name",
                cell: info => info.getValue(),
                header: () => <span>Nama Kategori</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => row.total_products,
                id: "total_products",
                cell: info => info.getValue(),
                header: () => <span>Jumlah Produk</span>,
                footer: props => props.column.id
            },
            {
                accessorFn: row => action(row.category_id, row.category_name),
                id: "action",
                cell: info => info.getValue(),
                header: () => <span>Action</span>,
                footer: props => props.column.id
            }
        ]
    )

    function action(id, title) {
        return (
            <div className="flex place-content-evenly gap-x-3">
                <button
                    onClick={() => navigate(`/detailkategori/${id}`)}
                    className={`bg-[#D7E1B9] hover:bg-slate-400 p-2 rounded-xl font-bold  flex place-content-center gap-x-2 w-1/3`}>
                    Detail
                </button>
                <button
                    onClick={() => navigate(`/formkategori`, { state: { id: id } })}
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

    const navigate = useNavigate();

    function handleHapus(id, title) {
        swallConfirmation(`Anda Ingin Menghapus \n${title}?`)
            .then(() => {
                axiosBackend.delete(`/deletecategory/${id}`)
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
                <span className=' text-5xl'>Daftar Kategori</span>
            </div>
            <div className=' relative'>
                <div className=' text-lg right-10 border-4 w-fit rounded-2xl' onClick={() => navigate("/formkategori")}>
                    <Button logo={<FaPlus />}>
                        <span>Tambah Kategori</span>
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
