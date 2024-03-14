import React from 'react'

export default function CategoriesButton({ name }) {
    return (
        <button className=' bg-red-100 px-2 rounded-lg text-lg hover font-semibold hover:bg-red-500 hover:text-white'>
            {name}
        </button>
    )
}
