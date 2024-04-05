import './Producto.css'
import FechaProducto from './FechaProducto';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductosContext from '../../store/ProductosContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Producto(props) {

    const [nombre, setNombre] = useState(props.producto.nombre);

    const contextProductos = useContext(ProductosContext);

    const precio = props.producto.precio;
    const fecha = props.producto.fecha;

    const clickHandler = () => { //Handler de eventos
        setNombre('Nuevo nombre');
    }

    const borraHandler = () => { //handler para borrar
        // props.borraProducto(props.producto.id);
        axios.delete('https://dsm-react-ejercicios-online-default-rtdb.firebaseio.com/productos/' + props.producto.id + '.json?auth='+props.idToken)
            .then((response) => {
                alert('Producto' + props.producto.id + ' borrado');
                contextProductos.borraProducto(props.producto.id);
                props.borraProducto2(props.producto.id);
            }).catch((error) => {
                alert("No se puede borrar");
            })
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
                {/* <h2>{nombre} - <Button variant='outline-warning'><Link to={`/product/${props.producto.id}`}>Ver detalles</Link></Button></h2> */}
                <h2>{nombre} - <Button variant='outline-warning'><Link to={`/product/${props.producto.id}?format=extended`}>Ver detalles</Link></Button></h2>

                <div className='producto__precio'>{precio}</div>
            </div>
            <Button onClick={clickHandler}>Cambia nombre</Button>
            <Button variant="warning" onClick={handleShow}>
                Ver detalles
            </Button>
            <Button variant="danger" onClick={borraHandler}>BORRAR</Button>
            {/* Esto solo borra productos que vienen desde desde la BD */}
            <Button variant="danger" onClick={borraHandlerContext}>BORRAR2</Button>
            {/* Esto solo borra productos que vienen desde app.js */}

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