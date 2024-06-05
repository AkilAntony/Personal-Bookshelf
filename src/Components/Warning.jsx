import React from 'react'

function Warning({message}) {
  return (
    <div className='bg-red-50 text-center 
            text-red-900  rounded  m-5 p-2'>
        {message}</div>
  )
}

export default Warning