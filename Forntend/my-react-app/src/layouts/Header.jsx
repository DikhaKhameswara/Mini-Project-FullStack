import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();
    return (
        <div className=' flex place-content-between'>
            <div className='text-5xl font-extrabold'>
                LYR Team PC
            </div>
        </div>
    )
}
