import { observer } from "mobx-react-lite"
import { ReactEventHandler, useEffect, useState } from "react"
import { IBook, ITag } from "../../Store/interface/IBook"
import Book from "../../Store/State/Book"

export enum Mode {
    CREATE,
    UPDATE
}

type Modal = {
    mode: Mode
    book?: IBook
    onClose: Function
    isHidden: boolean
    onSubmit: Function
}

export const ModalBookCreate = observer(({mode, book, onClose, isHidden, onSubmit}: Modal) => {

    const [author, setAuthor] = useState("")

    const [select, setSelect] = useState({
        value: 0,
    })

    const [date, setDate] = useState("")

    const [name, setName] = useState("")

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value)
    }

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value)

        setSelect({
            value: id, 
        })
    }

    const resetAll = () => {
        setAuthor("")
        setDate("")
        setName("")
        setSelect({value:0})
    }

    const onSubmitClick = () => {

        if(select.value === 0){
            Book.setMsg("Выберите или создайте жанр")
            return 
        }

        const newBook: IBook = {
            id: book?.id || 0,
            author,
            name,
            release: date,
            tag: {
                tagId: select.value,
                tagName: ""
            }
        }

        resetAll()
        //console.log(newBook)
        onSubmit(newBook)
        onClose()
    }

    useEffect(()=>{

        if(mode === Mode.UPDATE && book !== undefined){
            setAuthor(book!.author)
            setName(book!.name)
            setDate(book.release)
            setSelect({value: book!.tag.tagId})
            //setBookState(book)
        }
    }, [book])

    //component

    const tags = Book.tags?.map(el => <option value={el.tagId} key={el.tagId}>{el.tagName}</option>)

    if(isHidden){
        
        return <></>
    }

    return(
        <>
        <div className="modal-body absolute">
            
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Book</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>onClose()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <div>{Book.msg}</div>
                        <label>name</label>
                        <input type="text" className="form-control"   onChange={onNameChange} value={name}/>
                        <label>Author</label>
                        <input type="text" className="form-control"  onChange={onAuthorChange} value={author}/>
                        <label>release</label>
                        <input type="date" className="form-control"   onChange={onDateChange} value={date}/>

                    </div>
                    <div className="form-group">
                        <select value={select.value} onChange={handleChangeSelect} className="form-control">            
                            <option value="0">Select tag</option>
                            {tags}
                        </select>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onSubmitClick}>{mode===Mode.CREATE?"create": "update"}</button>
                </div>
                </div>
            </div>
        </div>
        <div className="absolute-full-scrin"> </div>
        </>
    )
})