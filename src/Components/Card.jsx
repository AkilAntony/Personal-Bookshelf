import React,{useContext, useEffect, useState} from 'react'
import Button from './Button'
import { json } from 'react-router-dom';
import { Context } from '../Utils/Context';

function Card({bookName,editionCount,id,showButton}) {
  const [isBookExist,setIsBookExist] = useState(false);
  const {warning,setWarning} = useContext(Context);
  const [books,setBooks] = useState()
  useEffect(()=>{
    const savedBooks = JSON.parse(localStorage.getItem('books'))
      if(!savedBooks){
        setIsBookExist(false);
        return setWarning('No Books Avilable in your shelf')
      }
      setBooks(savedBooks)
      savedBooks.map((data)=>{
        if(data.id == id) setIsBookExist(true)
      })
  },[books])
 
  const handleLocalStroage = ()=>{
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    console.log(savedBooks)
    const bookDetails = {id,bookName,editionCount};
    console.log(bookDetails)
    const updatedBooks = [...savedBooks,bookDetails]
    localStorage.setItem('books',JSON.stringify(updatedBooks))
  }
    
  return (

    // Card Container
    <div className='border border-gray-400
            w-60  rounded-xl m-auto h-72 mb-2
            hover:transition-all'>

        {/* Book Details */}
        <div className='h-40'>
        <div className='flex justify-evenly mt-7 mr-1 ml-1'>
            <div className='font-bold ml-2 w-full'>Book Title:</div>
            <div className='text-center w-full '>{bookName}</div>
        </div>
        <div className='flex justify-between mt-7 ml-2'>
            <div className='font-bold w-28'>Edition Count:</div>
            <div className='w-28'>{editionCount}</div>
        </div>
    </div>

        {/* Button Component Container */}
        {!isBookExist && showButton ? 
           <div className='flex items-center mt-7 
                  justify-center  mb-10 '>
            <Button name='Add to Bookshelf'
                event={handleLocalStroage}
            />
          </div> : ' ' 
         
        }
        
    </div>
  )
}

export default Card