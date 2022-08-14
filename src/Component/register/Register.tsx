import { useState } from "react"
import { Link } from "react-router-dom"
import { MyRoutes } from "../../common/routes"
import User from "../../Store/State/User"
import { observer } from "mobx-react-lite"

export const Register = observer(() => {

    //state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //handler
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }

    const onClick = () => {
        User.fetchReg({name, email, password})
    }

    return(
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <div className="form-outline mb-4">
                                    <input type="text" id="loginName" className="form-control" value={name} onChange={onNameChange}/>
                                    <label className="form-label" >username</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="loginEmail" className="form-control" value={email} onChange={onEmailChange}/>
                                    <label className="form-label">Email</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" className="form-control" value={password} onChange={onPasswordChange}/>
                                    <label className="form-label">Password</label>
                                </div>
                                <button className="btn btn-primary btn-block mb-4" onClick={onClick}>Register</button>
                                <div className="text-center">
                                    <p>Have account <Link to={'/'+MyRoutes.login.path}>Login</Link></p>
                                </div>
                                <div className="text-center">
                                    <p>{User.isRegister?"Register succes":""}</p>
                                </div>
                                <div className="text-center">
                                <p>{User.msg}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})