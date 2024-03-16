import React from 'react';

export default function InputTextRegular(props) {
    const { register, type = "text" } = props;

    return (
        <input type={type} {...register} {...props} className='border-2 border-red-300 w-full rounded-lg px-1' />
    )
}
