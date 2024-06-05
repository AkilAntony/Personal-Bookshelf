import React, { useEffect, useState , useContext} from 'react'
import Card from '../Components/Card'
import { json, useLocation } from 'react-router-dom'
import { Context } from '../Utils/Context';
import Button from '../Components/Button';

function BookShelf() {
  const location = useLocation();
  const [isBookAvailable,setIsBookAvailable] = useState(false);
  const {warning,setWarning} = useContext(Context);
  // const {bookDetails} = location.state || {};
  const [bookDetails,setBookDetails] = useState();
  useEffect(()=>{
    const bookShelf = JSON.parse(localStorage.getItem('books'));
    if(!bookShelf){
      setIsBookAvailable(false);
      setWarning("No Books Available")
    }
    setBookDetails(bookShelf)
    setWarning('');
    setIsBookAvailable(true);
  },[ ])

  return (
    <div className='m-3'>
      <h3 className='text-2xl text-center font-bold'>My Bookshelf</h3>
      <div className='mt-12 flex flex-wrap justify-center items-center'>
        {bookDetails ? 
        bookDetails.map((data)=>(
          <Card key={data.id} 
            bookName={data.bookName}
            editionCount={data.editionCount}
            showButton = {false}
          />
        ))
          : ''}
      </div>
      
     
    </div>
  )
}

export default BookShelf