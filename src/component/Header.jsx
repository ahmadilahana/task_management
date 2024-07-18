import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import AuthService from "../services/AuthService";
import toast from "react-hot-toast";

const Header = (props) => {
    console.log(props)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user');
        if (userLoggedIn) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const className = (path) => {
        if (window.location.pathname === path) return "active nav-link"
        return "nav-link"
    }

    const runLogout = () => {
        AuthService.logout().then(
            (response) => {
            },
            error => {

                if (error.response.status == 401) {
                    const userLoggedIn = localStorage.getItem('user');
                    const token = localStorage.getItem('token');
                    if (userLoggedIn && token) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
                
                toast.error(error.response.status +" "+error.response.data.message)
                navigate('/login')
            }
        )
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="px-3">
                <Navbar.Brand>Logo</Navbar.Brand>
                <Nav className="w-100">
                    {isLoggedIn && (
                        <Link to={'/'} className={className("/")}>Beranda</Link>
                    )}
                    <Navbar.Collapse className="justify-content-end">
                        {!isLoggedIn && (
                            <>
                                <Link to={'/login'} className={className("/login")}>Login</Link>
                                <Link to={'/register'} className={className("/register")}>Register</Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <span role="button" onClick={() => runLogout()} className={className("/logout")}>Logout</span>
                            </>
                        )}
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header