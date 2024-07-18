import { Alert, Button, CloseButton, FloatingLabel, Form } from "react-bootstrap"
import Header from "../component/Header"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { FaExclamationCircle } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {

        const userLoggedIn = localStorage.getItem('user');
        if (userLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage('');
        AuthService.register(name, email, password).then(() => {
            navigate('/login');
        }).catch(
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
        )
    }

    return (
        <>
            <Header />
            <main className="form-container">
                <Form className="form-box w-100 m-auto" onSubmit={handleRegister}>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>
                    <Alert show={showAlert} variant="danger" className="custom-alert">
                        <div className="d-flex align-items-center">
                            <FaExclamationCircle className="alert-icon me-2" />
                            <div className="flex-grow-1">
                                <p className="mb-0">{message}</p>
                            </div>
                            <CloseButton onClick={() => setShowAlert(!showAlert)} />
                        </div>
                    </Alert>
                    <FloatingLabel label="Nama" controlId="formNama">
                        <Form.Control className="atas" placeholder="nama"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Email" controlId="formEmail">
                        <Form.Control className="tengah" placeholder="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Password" controlId="formPassword">
                        <Form.Control className="bawah" placeholder="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}></Form.Control>
                    </FloatingLabel>
                    <p>Punya akun? <Link to={"/login"}>Login</Link></p>
                    <Button className="w-100 mt-3" type="submit">Registrasi</Button>
                </Form>
            </main>
        </>
    )
}

export default Register