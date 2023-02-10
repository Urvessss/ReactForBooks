import React, { useState } from 'react'
import BookEdit from './BookEdit';
import useBookContext from './../Hooks/use-book-context';

const BookShow = ({ book }) => {
    const [showEdit, setShowEdit] = useState()
const {deleteBookById}=useBookContext()

    const handleDelete = () => {
        deleteBookById(book.id);
    }
    const handleEdit = () => {
        setShowEdit(!showEdit)
    }
    const handleSubmit = () => {
        setShowEdit(false)
        
    }

    let content = <h3>{book.title}</h3>
    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit}  book={book} />
    }
    return (
        <div className='book-show'>
        <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`}/>
            <div>{content}</div>
            <div className='actions'>
                <button className='edit' onClick={handleEdit}>Edit</button>
                <button className='delete' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default BookShow