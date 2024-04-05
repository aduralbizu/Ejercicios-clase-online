import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useParams } from "react-router-dom";


const EditarProducto = (props) => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const parametros = useParams();

    useEffect(() => {
        axios.get('https://dsm-react-ejercicios-online-default-rtdb.firebaseio.com/productos.json?orderBy="$key"&equalTo="' + parametros.id + '"')
            .then((response) => { //Response es la promesa
                console.log(response.data);
                let arrayProducto = [];
                for (let key in response.data) { //Estamos creando el mismo objeto que response, pero añadiéndole el id.
                    arrayProducto.push({ //{} Sirve para crear un nuevo objeto
                        ...response.data[key], //Nos trae el json entero, y añade la id. ...: : Este es el operador de propagación que copia todas las propiedades del objeto response.data[key] dentro del nuevo objeto, sin crear un subobjeto
                        id: key
                    })
                }
                // console.log(arrayProducto);
                setNombre(arrayProducto[0].nombre); //así metemos el json
                setPrecio(arrayProducto[0].precio);
                setDescripcion(arrayProducto[0].descripcion);
                setFecha(arrayProducto[0].fecha);
            })
    }, []) //Lógica que solo se ejecuta cuando se ha montado el componente


    const submitHandler = (event) => {
        event.preventDefault(); //Para evitar recarga de la página
        const producto = {
            nombre: nombre,
            precio: precio,
            fecha: new Date(fecha),
            descripcion: descripcion
        }

        axios.put('https://dsm-react-ejercicios-online-default-rtdb.firebaseio.com/productos/' + parametros.id + '.json?auth=' + props.idToken, producto)
            .then((response) => {
                alert('Producto Actualizado');
            }).catch((error) => {
                alert('No se puede actualizar el producto')
            })
    }


    return (
        <>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col><Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={(event) => setNombre(event.target.value)} type="text" value={nombre} /></Col>
                        {/* onblur es cuando sales del input (clicas otro input) */}
                        <Col><Form.Label>Precio</Form.Label>
                            <Form.Control onChange={(event) => setPrecio(event.target.value)} type="number" value={precio} /></Col>
                        <Col><Form.Label>Fecha</Form.Label>
                            <Form.Control onChange={(event) => setFecha(event.target.value)} type="date" value={fecha} /></Col>
                        <Col><Form.Label>Descripcion</Form.Label>
                            <Form.Control onChange={(event) => setDescripcion(event.target.value)} type="text" value={descripcion} /></Col>
                        <Col><Button type="submit" variant="success">EDITAR PRODUCTO</Button></Col>
                    </Row>
                </Container>
            </Form>
        </>
    )
}

export default EditarProducto;