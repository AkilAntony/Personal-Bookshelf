import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Utils/Context'
import Button from '../Components/Button';
import Card from '../Components/Card';
import Warning from '../Components/Warning';
import { redirect, useNavigate } from 'react-router-dom';

function BookSearch() {
    const {bookDetails,setBookDetails,setWarning,
        warning
    } = useContext(Context);
    const [userInput,setUserInput] = useState('')
    
    useEffect(()=>{
            getBookDetails()
    },[userInput])

    const navgigate = useNavigate()

    // function to handle Navigation
    const handleNavigate = ()=>{
        navgigate('/bookshelf',{state:{bookDetails}})
    }

    // function to get bookDetails from API
    const getBookDetails = async() =>{
        try{
            setWarning('')
            const response = await fetch(`https://openlibrary.org/search.json?q=${userInput}&limit=10&page=1`);
            const data = await response.json();
            if(!data.docs){
                return setWarning("No Book Found")
            }
            console.log(data.docs);
            setBookDetails(data.docs)
        }catch(error){
            console.log(error);
            return setWarning('Failed to Fetch Please Enter Valid Book Name');
        }
    }
  return (
    <div className=''>

        {/* My Bookshelf Button container */}
        <div className='flex items-center 
                justify-end p-4 bg-gray-50
                flex items-center'>
            <div>
                <Button name='My BookShelf'
                    event = {handleNavigate}
              /> 
            </div>
        </div>

        {/* Search Bar container */}
        <div className='flex items center md:justify-between
                m-4 mt-8 flex-wrap'>
            <input 
                type="text" name="bookname"
                className='border-none outline-none bg-gray-200
                    rounded-2xl hover:bg-gray-300 md:w-4/12 w-72
                    m-auto shadow-md hover:shadow-lg p-2
                    '
                placeholder='Search By Book Name'
                onChange={(e)=>setUserInput(e.target.value)} />
        </div>
        
        {/* Warining Component */}
        {warning && 
            <div>
            <Warning message={warning}/>
        </div> }
        
        {/* Card component Container 
            Note : The Card Component will render only if we get data from API*/}
        {bookDetails ? 
            <div className=' flex flex-wrap ml-2 
                    mb-2 items-center justify-center p-10 md:p-28'>
                {bookDetails.map((data)=>(
                    <Card key={data.edition_key}
                        editionCount = {data.edition_count}
                        id = {data.edition_key[0]}
                        bookName={data.title}
                        showButton = {true}/>
                ))}
            </div>
       : '' }
    </div>
  )
}

export default BookSearch