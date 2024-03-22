import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import React, { useState } from 'react';

export default function MyTable({ data, columns }) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    })

    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination
        }
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    })
    const sizeColumn = `w-[${100 / columns.length}%]`;

    return (
        <div className=" flex place-content-center">
            <div className="p-2 w-full">
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[3, 5, 7].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className=" w-full min-h-[24rem]">
                    <table className=" w-full border-4">
                        <thead className="bg-black text-white text-left text-3xl w-full h-[3rem]">
                            {table.getHeaderGroups()?.map(headerGroup => (
                                <tr key={headerGroup.id} className=" w-full">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} colSpan={header.colSpan} className=" border-r-2 border-l-2 border-white">
                                            <div className="m-2">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className=" text-xl">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className=" border-b-2 border-gray-300 h-[4rem]">
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} className={`${sizeColumn} px-2`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
