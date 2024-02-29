import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const NuevoProducto = (props) => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [fecha, setFecha] = useState('');

    const nombreRef = useRef(); //Esta variable va a ser un puntero. Es lo que estamos diciendo.

    useEffect(()=>{
        nombreRef.current.focus()}) //Lógica que solo se ejecuta cuando se ha montado el componente

    const nombreHandler = (event) => {
        setNombre(event.target.value) //event.target se refiere al elemento DOM que desencadenó el evento. .value es una propiedad de este elemento que contiene el valor actual del elemento.
    }

    const precioHandler = (event) => {
        setPrecio(event.target.value)
    }

    const fechaHandler = (event) => {
        setFecha(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault(); //Para evitar recarga de la página
        const producto = {
            id: Math.random().toString(),
            nombre: nombre,
            precio: precio,
            fecha: new Date(fecha)
        }
        // console.log(producto)
        props.addProducto(producto);
        setNombre('');
        setPrecio('');
        setFecha(''); //Borro contenido interfaz. Equivalente:  nombreRef.current.value = '';
        nombreRef.current.focus(); 
       
    }

    return (
        <Form onSubmit={submitHandler}>
            <Container>
                <Row>
                    <Col><Form.Label>Nombre</Form.Label>
                        <Form.Control ref = {nombreRef} onChange={nombreHandler} type="text" value={nombre} /></Col>
                    <Col><Form.Label>Precio</Form.Label>
                        <Form.Control onChange={precioHandler} type="number" value={precio} /></Col>
                    <Col><Form.Label>Fecha</Form.Label>
                        <Form.Control onChange={fechaHandler} type="date" value={fecha} /></Col>
                    <Col><Button type="submit" variant="success">AÑADIR PRODUCTO</Button></Col>
                </Row>
            </Container>
        </Form>
    )
}

export default NuevoProducto;