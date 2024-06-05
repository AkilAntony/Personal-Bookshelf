import { useState } from 'react';
import { Context } from './Utils/Context';
import './App.css';
import Button from './Components/Button';
import Card from './Components/Card';
import BookSearch from './Pages/BookSearch';
import { Route, Routes } from 'react-router-dom';
import BookShelf from './Pages/BookShelf';

function App() {
  const [bookDetails,setBookDetails] = useState([]);
  const [warning,setWarning] = useState('')
  return (
    <div className="App ">
      <Context.Provider 
        value={{bookDetails,setBookDetails,warning,setWarning}}>
          <Routes>
            <Route path='/' element={<BookSearch/>} />
            <Route path='/bookshelf' element={<BookShelf/>} />
          </Routes>
          
      </Context.Provider>
    </div>
  );
}

export default App;
