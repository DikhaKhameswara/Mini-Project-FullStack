import React from 'react';

export default function CategoriesButton({ name, category_id, idActive }) {
    let className = 'bg-red-100';
    if (category_id == idActive) {
        className = " bg-cyan-400";
    }
    // console.log(idActive);

    return (
        <button className={` transition ease-in-out duration-300 px-2 rounded-lg text-lg hover font-semibold hover:bg-red-500 hover:text-white ${className}`}>
            {name}
        </button>
    )
}
