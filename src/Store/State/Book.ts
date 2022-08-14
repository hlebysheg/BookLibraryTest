import { ITag } from './../interface/IBook';
import { getAllBooksUrl, getAllTagsUrl, getCreateBooksUrl, getCreateTagsUrl, getDeleteBooksUrl, getUpdateBooksUrl } from './../../common/url';
import { computed, makeAutoObservable, makeObservable } from "mobx"
import User from './User';
import { IBook } from '../interface/IBook';

const method = {
    get:'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
};

class Book {

    msg = ""
    books: Array<IBook> | null = null
    tags: Array<ITag> | null = null

    constructor() {
        makeAutoObservable(this)
    }

    private _resetMsg(){
        this.msg = ""
    }

    private _fethDate<T>(url: string, mtd: string, body?: T){

        this._resetMsg()
        return fetch(url, {
            method: mtd,
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${User.acessToken}`
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        }).then(res => res.json()).catch(er => {throw er})
    }

    setMsg (str: string) {
        this.msg = str
    }

    *getBook(){
        let response: Array<IBook> = yield this._fethDate(getAllBooksUrl(), method.get)
        .catch(ex => this.msg = "some Error")

        this.books = response
    }

    *createBook(book: IBook){
        let response: IBook = yield this._fethDate(getCreateBooksUrl(), method.post, book)
        .catch(ex => this.msg = "some Error")

        if(this.books === null){
            this.books = [response]
        }
        else {
            this.books?.unshift(response)
        }
        
    }

    *updateBook(book: IBook){
        let response: IBook = yield this._fethDate(getUpdateBooksUrl(), method.put, book)
        .catch(ex => console.log(ex))
        
        this.books = this.books!.map(el => {
            if(el.id === response.id){
                return response
            }
            return el
        })
    }

    *deleteBook(id: number){
        let response: boolean = yield this._fethDate(getDeleteBooksUrl(id), method.delete)
        .catch(ex => console.log(ex))

        if(response === true) {
            this.books = this.books!.filter(el => {
                if(el.id === id) {
                    return false
                }
                return true
            })
        }
    }

    *getTags(){
        let response: Array<ITag> = yield this._fethDate(getAllTagsUrl(), method.get)
        .catch(ex => console.log(ex))
        
        this.tags = response
    }

    *createTag(tag: ITag){
        let response: ITag = yield this._fethDate(getCreateTagsUrl(), method.post, tag)
        .catch(ex => console.log(ex))
        
        if(this.tags === null){
            this.tags = [response]
        }
        else {
            this.tags?.push(response)
        }
    }
}

export default new Book()