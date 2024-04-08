import React from 'react';

export default function Usage_Component({ topText, bottomText }) {
    return (
        <div className="flex flex-col items-center">
            <span className='text-sky-800 text-base font-medium '>{topText}</span>
            <hr className="w-11/12 my-2 border-t-2 border-sky-800 " /> 
            <span className="text-sky-800 text-xl font-semibold mt-1">{bottomText}</span>
        </div>
    );
}
