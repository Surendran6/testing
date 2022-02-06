import React,{useContext} from 'react'
import './Navbar.css';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';
//Custom Imports
import { userContext } from '../Context/AuthProvider'

function Navbar() {
    const {loggedIn,setLoggedIn} = useContext(userContext)
    const history = useHistory()
    const Logout = () => {
        localStorage.removeItem('authToken');
        setLoggedIn(false)
        history.push('/homepage')
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light">          
           <h2 className="logo">Quickly</h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{fontWeight:"bolder",color:"hotpink"}}>
                <ul className="navbar-nav ml-auto" >
                    {
                        loggedIn === false 
                        &&
                        <>
                        <li className="nav-item pr-3 active">
                            <Link className="nav-link  text-info  text-center" to="/signup">
                                <i className="fas fa-user"></i>
                                <span className="pl-2">SignUp</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link text-info text-center" to="/login">
                                <i className="fad fa-sign-in-alt"></i>
                                <span className="pl-2">Login</span>
                            </Link>
                        </li>
                        </>
                    }
                    {
                        loggedIn === true &&
                        <>
                        <li className="nav-item pr-3 active">
                            <Link className="nav-link  text-info  text-center" to="/dashboard">
                                    <i className="fad fa fa-ticket"></i>
                                <span className="pl-2">Book Ticket</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                                <Link className="nav-link text-info text-center" to="/viewsAvaiable">
                                <i className="fad fa-sort-size-down"></i>
                                <span className="pl-2">Avaiable Tickets</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link text-info  text-center" to="/views">
                            <i className="fad fa-eye"></i>
                            <span className="pl-2">View Booked Tickets</span></Link>
                        </li>
                        <li className="nav-item pr-3">
                            <button className = "btn btn-danger btn-sm" onClick = {Logout}>Logout</button>
                        </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
