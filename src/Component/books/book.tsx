import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { useEffect } from "react"
import { IBook, ITag } from "../../Store/interface/IBook"
import Book from "../../Store/State/Book"
import User from "../../Store/State/User"
import { ModalBookCreate, Mode   } from "../modal/modalCreateBook"
import { ModalTagCreate } from "../modal/modalCreateTag"
import { BookCard } from "./bookCard"

export const Books = observer(() => {
    //state
    const [isHiddenCreateBook, setIsHiddenCreateBook] = useState(true)
    const [isHiddenUpdateBook, setIsHiddenUpdateBook] = useState(true)
    const [isHiddenCreateTag, setIsHiddenCreateTag] = useState(true)
    const [bookToUpdate, setBookToUpdate] = useState<IBook>()
    //events
    const onCloseAll = () => {
        setIsHiddenCreateBook(true)
        setIsHiddenCreateTag(true)
        setIsHiddenUpdateBook(true)
    }

    const onUpdateBookClick = (book: IBook) => {
        setBookToUpdate(book)
        setIsHiddenUpdateBook(false)
    }

    const onAddBookClick = () => {
        setIsHiddenCreateBook(false)
    }

    const onAddTagClick = () => {
        setIsHiddenCreateTag(false)
    }

    const onDeleteBookClick = (id: number) => {
        Book.deleteBook(id)
    }

    //modal submit
    const onBooCreatekSub = (book: IBook) => {
        Book.createBook(book)
    }

    const onBookUpdateSub = (book: IBook) => {
        Book.updateBook(book)
    }

    const onTagCreateSub = (tag: ITag) => {
        Book.createTag(tag)
    }

    //effects
    useEffect(()=> {
        Book.getBook()
        Book.getTags()
    },[])

    //component
    const books = Book.books?.map(el => <BookCard 
                                                key={el.id} 
                                                onUpdateBookClick={onUpdateBookClick} 
                                                onDeleteBookClick = {onDeleteBookClick} 
                                                book = {el}
                                        />)
    
    return (
        <>
        <div className="flex">
        <ModalBookCreate mode = {Mode.CREATE} onClose={onCloseAll} isHidden={isHiddenCreateBook} onSubmit={onBooCreatekSub}/>
        <ModalBookCreate mode = {Mode.UPDATE} book={bookToUpdate} onClose={onCloseAll} isHidden={isHiddenUpdateBook} onSubmit={onBookUpdateSub}/>
        <ModalTagCreate onClose = {onCloseAll} isHidden = {isHiddenCreateTag} onSubmit = {onTagCreateSub}/>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        {
                        User.isAuth?
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={onAddBookClick}>Add Book</button>
                            <button type="button" className="btn btn-secondary" onClick={onAddTagClick}>Add Tag</button>
                        </div>
                        :""}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {Book.books !== null && Book?.books.length > 0?books:
                        <div className="container">
                            <p className="text-center">Add books</p>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
})