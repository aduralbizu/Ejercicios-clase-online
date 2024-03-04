import './Producto.css'
import FechaProducto from './FechaProducto';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductosContext from '../../store/ProductosContext';

function Producto(props) {

    const [nombre, setNombre] = useState(props.producto.nombre);

    const contextProductos = useContext(ProductosContext);

    const precio = props.producto.precio;
    const fecha = props.producto.fecha;

    const clickHandler = () => { //Handler de eventos
        setNombre('Nuevo nombre');
    }

    const borraHandler = () => { //handler para borrar
        props.borraProducto(props.producto.id);
    }

    const borraHandlerContext = () => { //handler para borrar
        contextProductos.borraProducto(props.producto.id);
    }

    const [show, setShow] = useState(false); //lógica ventana modal

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='producto'>
            <FechaProducto fecha={fecha} />
            <div className='producto__descripcion'>
                <h2>{nombre}</h2>
                <div className='producto__precio'>{precio}</div>
            </div>
            <Button onClick={clickHandler}>Cambia nombre</Button>
            <Button variant="warning" onClick={handleShow}>
                Ver detalles
            </Button>
            <Button variant = "danger" onClick = {borraHandler}>BORRAR</Button>
            <Button variant = "danger" onClick = {borraHandlerContext}>BORRAR2</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>DETALLES DE MI PRODUCTO: {precio}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Producto