import React from 'react'

function Button({name,event}) {
  return (
    <div>
        <button 
            className='text-white bg-green-600 py-1 
                px-4 rounded-xl hover:bg-green-800'
            onClick={event}>
            {name}</button>
    </div>
  )
}

export default Button