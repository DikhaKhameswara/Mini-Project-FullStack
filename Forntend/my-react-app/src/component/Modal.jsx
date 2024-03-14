
import React from 'react'

export default function Modal({ children }) {
    return (
        <div className=' news-modal-overlay w-[20rem] h-[20rem] flex place-content-center transition ease-in duration-1000 border-4'>
            {children}

        </div>
    )
}
