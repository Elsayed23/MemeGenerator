import React from 'react';

export default function GeneratorButton({ random }) {
    return (
        <button
            className='form-btn p-4 border-0 text-white rounded-md font-bold w-full'
            onClick={random}>
            Get a new meme image  🖼
        </button>
    )
}