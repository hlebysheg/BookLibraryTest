import { Link } from "react-router-dom"
import { MyRoutes } from "../common/routes"
import { observer } from "mobx-react-lite"
import User from "../Store/State/User"
import { MouseEventHandler, ReactHTMLElement } from "react"

export const Header = observer(() => {

    const logOut = () => {
        User.logOut()
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={MyRoutes.book.path}>Book <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
                
                <span className="navbar-text">
                    <ul className="navbar-nav mr-auto">
                        {!User.isAuth?<>
                            <li className="nav-item">
                                <Link className="nav-link" to={MyRoutes.login.path}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={MyRoutes.register.path}>Register</Link>
                            </li>
                        </>:
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to={MyRoutes.book.path}>{User.name}</Link>
                            </li>
                            <li className="nav-item" onClick={logOut}>
                                <Link className="nav-link" to={MyRoutes.register.path}>Logout</Link>
                            </li>
                        </>
                        }
                    </ul>
                </span>
                
            </div>
        </nav>
    )
})