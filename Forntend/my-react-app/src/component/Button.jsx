import React from 'react';

export default function Button(props) {
    const { type, children, logo } = props;
    return (
        <button type={type} className='bg-slate-200 p-2 rounded-xl font-bold hover:bg-slate-400 flex place-items-center gap-x-2'>
            {logo && logo}{children}
        </button>
    )
}
