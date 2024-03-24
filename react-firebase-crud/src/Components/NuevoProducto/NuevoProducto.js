import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactDOM from 'react-dom';
import './NuevoProducto.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

//Nuevo componente, sin exportarlo, para utilizarlo aquí mismo:
const InfoModal = (props) => {

    const [open, setOpen] = useState(true);
    const onClickHandler = () => {
        setOpen(false);
    }

    //He añadido lógica para quitar mensaje si es necesario
    if (open) {
        return (
            <>
                <h1>{props.titulo}</h1>
                <p>{props.mensaje}</p>
                <button onClick={onClickHandler}>CERRAR</button>
            </>

        )
    }
    return null; //Si no es verdad
}

const NuevoProducto = (props) => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navega = useNavigate(); //Hook para cambiar la ubicación actual del enrutador. Un hook en React es una función especial que te permite agregar características de React a un componente funcional. 

    const nombreRef = useRef(); //Esta variable va a ser un puntero. Es lo que estamos diciendo.

    const [nombreValid, setNombreValid] = useState(true);

    useEffect(() => {
        //nombreRef.current.focus() Comentado por comodidad
    }, []) //Lógica que solo se ejecuta cuando se ha montado el componente

    const nombreHandler = (event) => {
        setNombre(event.target.value); //event.target se refiere al elemento DOM que desencadenó el evento. .value es una propiedad de este elemento que contiene el valor actual del elemento.
        setNombreValid(true);
    }

    const precioHandler = (event) => {
        setPrecio(event.target.value)
    }

    const fechaHandler = (event) => {
        setFecha(event.target.value)
    }

    const descripcionHandler = (event) => {
        setDescripcion(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault(); //Para evitar recarga de la página
        const producto = {
            id: Math.random().toString(),
            nombre: nombre,
            precio: precio,
            fecha: new Date(fecha),
            descripcion: descripcion
        }
        // console.log(producto)
        props.addProducto(producto);
        setNombre('');
        setPrecio('');
        setFecha(''); //Borro contenido interfaz. Equivalente:  nombreRef.current.value = '';
        // nombreRef.current.focus();
        // setTimeout(() => { navega('/products') }, 1000)
        // navega('/products');

        axios.post('https://dsm-react-ejercicios-online-default-rtdb.firebaseio.com/productos.json',producto)
        .then((response)=>{
            alert("El producto se ha insertado en la BD");
        })
    }

    const onBlurHandler = () => {
        if (nombre.length === 0) { setNombreValid(false) };
    }

    let contenidoModal = '';
    if (!nombreValid) {
        // contenidoModal = <InfoModal titulo="CONFIRME VALIDEZ" mensaje="El campo está vacío" />;
        contenidoModal = ReactDOM.createPortal(<InfoModal titulo="CONFIRME VALIDEZ" mensaje="El campo está vacío" />,
            document.getElementById('overLay'))
    }

    return (
        <>
            {contenidoModal}
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col><Form.Label className={`${nombreValid ? '' : 'invalid'}`}>Nombre</Form.Label>
                            <Form.Control ref={nombreRef} onChange={nombreHandler} onBlur={onBlurHandler} type="text" value={nombre} /></Col>
                        {/* onblur es cuando sales del input (clicas otro input) */}
                        <Col><Form.Label>Precio</Form.Label>
                            <Form.Control onChange={precioHandler} type="number" value={precio} /></Col>
                        <Col><Form.Label>Fecha</Form.Label>
                            <Form.Control onChange={fechaHandler} type="date" value={fecha} /></Col>
                        <Col><Form.Label>Descripcion</Form.Label>
                            <Form.Control onChange={descripcionHandler} type="text" value={descripcion} /></Col>
                        <Col><Button type="submit" variant="success">AÑADIR PRODUCTO</Button></Col>
                    </Row>
                </Container>
            </Form>
        </>
    )
}

export default NuevoProducto;