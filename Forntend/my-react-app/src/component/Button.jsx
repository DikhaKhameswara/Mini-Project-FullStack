import React from 'react';

export default function Button(props) {
    const { children, logo } = props;
    return (
        <button className='bg-slate-200 p-2 rounded-xl font-bold hover:bg-slate-400 flex place-items-center gap-x-2'>
            {logo && logo}{children}
        </button>
    )
}
