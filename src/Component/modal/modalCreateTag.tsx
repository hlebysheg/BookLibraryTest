import { observer } from "mobx-react-lite"
import { ReactEventHandler, useEffect, useState } from "react"
import { IBook, ITag } from "../../Store/interface/IBook"
import Book from "../../Store/State/Book"

export enum Mode {
    CREATE,
    UPDATE
}

type Modal = {
    onClose: Function
    isHidden: boolean
    onSubmit: Function
}

export const ModalTagCreate = ({onClose, isHidden, onSubmit}: Modal) => {

    const [name, setName] = useState("")

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }



    const resetAll = () => {
        setName("")
    }

    const onSubmitClick = () => {

        if(name === ""){
            Book.setMsg("введите жанр")
            return 
        }
        
        const tag: ITag =  {
            tagName: name,
            tagId: 0
        }

        resetAll()
        //console.log(newBook)
        onSubmit(tag)
        onClose()
    }

    if(isHidden){
        
        return <></>
    }

    return(
        <>
        <div className="modal-body absolute">
            
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Tag</h5>
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
                    </div>
                    <div className="form-group">
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onSubmitClick}>{"Create tags"}</button>
                </div>
                </div>
            </div>
        </div>
        <div className="absolute-full-scrin"> </div>
        </>
    )
}