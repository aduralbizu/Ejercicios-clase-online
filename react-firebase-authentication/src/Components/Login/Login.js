import axios from "axios";
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault(); //Para que no se recargue la página
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        } 
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7hAqEDcjRWIzIk-VJev-O2ge2nbsnU8M',authData)
        .then((response)=>{
            console.log(response);
            props.actualizarLogin(true,response.data);
            alert("Se ha loggeado correctamente.");
        })
        .catch((error)=>{
            alert('Usuario o contraseña incorrecta.');
        })
    }

    const logoutHandler = ()=>{
        props.actualizarLogin(false,{});
    }

    return (
        <Form onSubmit={submitHandler}>
            <Container>
                <Row>
                    <Col><Form.Label>Email: </Form.Label>
                        <Form.Control onChange={(event) => setEmail(event.target.value)} type="email" value={email} /></Col>
                    {/* onblur es cuando sales del input (clicas otro input) */}
                    <Col><Form.Label>Password: </Form.Label>
                        <Form.Control onChange={(event) => setpassword(event.target.value)} type="password" value={password} /></Col>
                    <Col><Button type="submit" variant="primary">LOGIN</Button></Col>
                    <Col><Button variant="warning" onClick={logoutHandler}>LOGOUT</Button></Col>
                </Row>
            </Container>
        </Form>
    )
}

export default Login