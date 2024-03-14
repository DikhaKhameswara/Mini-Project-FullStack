import React from 'react';
import { FaHistory } from "react-icons/fa";
import Button from '../component/Button';

export default function Header() {
    return (
        <div className=' flex place-content-between'>
            <div className='text-5xl font-extrabold'>
                LYR Team PC
            </div>
            <div>
                <Button children={"Transactions History"} logo={<FaHistory />} />
            </div>
        </div>
    )
}
