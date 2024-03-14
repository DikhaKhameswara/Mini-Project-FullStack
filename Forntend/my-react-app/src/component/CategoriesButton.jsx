import React from 'react';

export default function CategoriesButton({ name, category_id, idActive }) {
    let className = 'bg-red-100';
    if (`category_id=${category_id}` == idActive) {
        className = " bg-cyan-400";
    }

    return (
        <button className={` px-2 rounded-lg text-lg hover font-semibold hover:bg-red-500 hover:text-white ${className}`}>
            {name}
        </button>
    )
}
