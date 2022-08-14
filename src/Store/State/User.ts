import { getLoginByTokenUrl, getRegisterUrl } from './../../common/url';
import { computed, makeAutoObservable, makeObservable } from "mobx"
import { getLoginByNameUrl } from "../../common/url";
import { ILoginResponse, IResponse, IUser } from "../interface/IUser";

class User {

    refreshToken = ""
    acessToken = "";
    name = "";
    isRegister = false;
    msg = ""
    isAuth = false

    constructor() {
        makeAutoObservable(this)
        this._getTokenInStorage()
        if(this.refreshToken.length > 1){
            this.fetchRefresh()
        }
        
    }

    private _setTokenInStorage(){
        window.localStorage.setItem('token', this.acessToken)
        window.localStorage.setItem('name', this.name)
        window.localStorage.setItem('refresh', this.refreshToken)
    }

    private _getTokenInStorage(){
        this.acessToken = window.localStorage.getItem('token') || ""
        this.refreshToken = window.localStorage.getItem('refresh') || ""
        this.name = window.localStorage.getItem('name') || ""
    }

    private _updateToken(data: ILoginResponse, name:string|null = null){
        this.refreshToken = data.refreshToken
        this.acessToken = data.accesToken
        if(name != null) {this.name = name}

        this._setTokenInStorage()
    }

    private _resetMsg(){
        this.msg = ""
    }

    private _fethDate<T>(body: T, url: string){

        this._resetMsg()

        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
    }

    *fetchLogin(name: string, password: string){

        const data = {
            name,
            password,
        }

        const response: ILoginResponse = yield this._fethDate(data, getLoginByNameUrl())
        .then(el => {
            if(el.status == 200){
                return el.json()
            }
            throw new Error("")
        })
        .catch(er=> {
            this.msg = "error in login or password"
        })

        if(response != null && response !== undefined){
            this.isAuth = true
            this._updateToken(response, name)
        }
    }

    *fetchRefresh(){

        const data: ILoginResponse ={
            refreshToken: this.refreshToken,
            accesToken: this.acessToken
        }
        
        const response:ILoginResponse | null  = yield this._fethDate(data, getLoginByTokenUrl())
            .then(el => {
                if(el.status == 200){
                    return el.json()
                }
                return null
                throw new Error("")
                //throw new Error("")
            })
            .catch(er => null)
        
        if(response != null && response !== undefined){
            this.isAuth = true
            this._updateToken(response)
        }
    }

    *fetchReg(user: IUser){

        const response:ILoginResponse = yield this._fethDate(user, getRegisterUrl())
            .then(el => {
                if(el.status === 200){
                    this.isRegister = true
                }
                else {
                    this.msg = "try another login or email"
                }
            })
            //this.msg = "Enter another mail or name"   
    }

    logOut(){
        this.isAuth = false
        this._updateToken({refreshToken: "", accesToken: ""}, "")
    }
}

export default new User()