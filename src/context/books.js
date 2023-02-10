import { createContext,useState } from "react";
import axios from 'axios';

const BooksContext=createContext()

function Provider({children}){
    const [books, setBooks] = useState([]);
  const fetchBooks= async()=>{
const responce=await axios.get(`http://localhost:3001/books`)
setBooks(responce.data)
  };
  const editBookById = async(id, newTitle) => {
    const responce=await axios.put(`http://localhost:3001/books/${id}`,{
      title:newTitle,
    })
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book,...responce.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };
  const deleteBookById = async(id) => {
    await axios.delete(`http://localhost:3001/books/${id}`)
    const updateBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updateBooks);
  }
  const createBook =async (title) => {
  
    const responce= await axios.get(`http://localhost:3001/books`,{
      title
    })
    const updatedBooks = [
      ...books,
      responce.data
    ];
    setBooks(updatedBooks);
  };
  const valueToShare={
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks
  };
    return <BooksContext.Provider
    value={valueToShare}>
        {children}

    </BooksContext.Provider>
}
export {Provider}
export default BooksContext;