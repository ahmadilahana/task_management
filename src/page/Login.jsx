import { Alert, Button, CloseButton, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import Header from "../component/Header"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { FaExclamationCircle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user');
        if (userLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');

        AuthService.login(email, password).then(
            () => {
                navigate('/')
            },
            error => {
                var resMessage = "";
                if (error.response.status === 422) {
                    resMessage = error.response.data.message[0];
                } else {
                    resMessage = error.response.data.message;
                }
                setMessage(resMessage);
                setShowAlert(true);
            }
        );
    };

    return (
        <>
            <Header />
            <main className="form-container">
                <Form className="form-box w-100 m-auto" onSubmit={handleLogin}>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    <Alert show={showAlert} variant="danger" className="custom-alert">
                        <div className="d-flex align-items-center">
                            <FaExclamationCircle className="alert-icon me-2" />
                            <div className="flex-grow-1">
                                <p className="mb-0">{message}</p>
                            </div>
                            <CloseButton onClick={() => setShowAlert(!showAlert)} />
                        </div>
                    </Alert>
                    <FloatingLabel label="Email" controlId="formEmail">
                        <Form.Control className="atas" placeholder="userId" type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Password" controlId="formPassword">
                        <Form.Control className="bawah" placeholder="password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </FloatingLabel>
                    <p>Belum Registrasi? <Link to={"/register"}>Register</Link></p>
                    <Button className="w-100 mt-3" type="submit">Login</Button>
                </Form>
            </main>
        </>
    )
}

export default Login