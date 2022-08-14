import { observer } from "mobx-react-lite"
import { useState } from "react"
import { IBook } from "../../Store/interface/IBook"
import User from "../../Store/State/User"

type IBookCard =  {
    book: IBook,
    onUpdateBookClick: Function,
    onDeleteBookClick: Function
}

export const BookCard = observer(({book, onUpdateBookClick, onDeleteBookClick}: IBookCard) => {
    
    
    const onEditClick = () => {
        onUpdateBookClick(book)
    }

    const onDeleteClick = () => {
        onDeleteBookClick(book.id)
    }

    return (
        <>
        <div className="col-3 padding-botom">
            <div className="card shadow-sm">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Placeholder</text></svg>
                    <div className="card-body">
                    <p className="card-text">{book.name}</p>
                    <p className="card-text">Author: {book.author}</p>
                    <p className="card-text">Tag: {book.tag.tagName}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        {User.isAuth&&<div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onEditClick}>Edit</button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={onDeleteClick}>Delete</button>
                        </div>}
                    <small className="text-muted">{new Date(Date.parse(book.release)).getFullYear()}</small>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
})