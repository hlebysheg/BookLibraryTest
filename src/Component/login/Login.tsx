import { Link, useNavigate } from "react-router-dom"
import { MyRoutes } from "../../common/routes"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import User from "../../Store/State/User"

export const Login = observer(() => {

    //state
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
    //handler
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }

    const onClick = () => {
        User.fetchLogin(name, password)
    }

    //effect
    useEffect(()=>{
        if(User.isAuth){
            navigate('/')
        }
    }, [User.isAuth])
    
    return(
        <>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <div className="form-outline mb-4">
                                    <input type="email" id="loginName" className="form-control" onChange={onNameChange} value={name}/>
                                    <label className="form-label" >Name</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" className="form-control" onChange={onPasswordChange} value={password}/>
                                    <label className="form-label">Password</label>
                                </div>
                                <button className="btn btn-primary btn-block mb-4" onClick={onClick}>Sign in</button>
                                <div className="text-center">
                                    <p>Dont have account? <Link to={'/'+MyRoutes.register.path}>Register</Link></p>
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