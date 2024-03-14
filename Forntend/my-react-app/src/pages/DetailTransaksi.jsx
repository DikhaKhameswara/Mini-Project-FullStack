import React from 'react';
import { useParams } from 'react-router-dom';

export default function DetailTransaksi() {
    const params = useParams();
    console.log(params)
    return (
        <div>DetailTransaksi</div>
    )
}
