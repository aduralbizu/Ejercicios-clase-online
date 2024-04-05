import Producto from "./Producto";
import FiltroProductos from "./FiltroProductos";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";

function Productos(props) {
    const [ano, setAno] = useState(''); //Estado inicial: Vacío

    const [productos, setProductos] = useState([]); //Array vacío

    useEffect(() => {
        // console.log("Se monta productos");
        axios.get('https://dsm-react-ejercicios-online-default-rtdb.firebaseio.com/productos.json')
            .then((response) => {
                // console.log(response.data);
                let arrayProductos = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        nombre: response.data[key].nombre,
                        precio: response.data[key].precio,
                        fecha: new Date(response.data[key].fecha),
                        descripcion: response.data[key].descripcion
                    })
                }
                console.log(arrayProductos);
                setProductos(arrayProductos);
            }).catch((error) => {
                alert("Se ha producido un error");
            })
    }, []); //Dependencia array vacío para que solo se ejecute una vez

    const borraProducto2 = (id) => { //para borrar componente de producto que ya ha sido borrado de la BD:
        let copiaProductos = [...productos]; //A shallow copy means constructing a new collection object and then populating it with references to the child objects found in the original. I
        copiaProductos = copiaProductos.filter((elemento) => { // Filter recorre todos los elementos, la función se ejecutará para todos. En aquellos elementos donde la comparación de la función sea verdadera, nos quedamos con el elemento
            return elemento.id !== id; //si es distinto, déjalo
        })
        setProductos(copiaProductos);
    }

    const updateAno = (ano) => {
        setAno(ano);
    }

    const productosFiltrados = props.productos.filter((element) => { //Con esto hago el filtrado de productos que se van a presentar según ano. Ano lo actualiza el hijo FiltradoProducto.js
        if (ano !== '') {
            return element.fecha.getFullYear().toString() === ano;
        }
        return true; //Todos los años lo van a cumplir
    }) //Ano se va actualizando a tiempo real, y esto se va filtrando con una sola línea

    let contenido = <Alert variant="primary">No hay productos</Alert>; //Contenido condicional. Lo presentaremos en pantalla

    if (productosFiltrados.length > 0) {
        contenido = <div>
            {
                productos.map((elemento) => { // La expresión props.productos.map(...) en JavaScript generalmente se usa para iterar sobre cada elemento de un array. Ejecuta la función que se le pasa como argumento para cada elemento del array
                    return (
                        <Producto key={elemento.id} producto={elemento} borraProducto={props.borraProducto} borraProducto2={borraProducto2} idToken = {props.idToken}/>
                    )
                })
            }
            <h1>---------------------------------------------</h1>
            {
                productosFiltrados.map((elemento) => { // La expresión props.productos.map(...) en JavaScript generalmente se usa para iterar sobre cada elemento de un array. Ejecuta la función que se le pasa como argumento para cada elemento del array
                    return (
                        <Producto key={elemento.id} producto={elemento} borraProducto={props.borraProducto} />
                    )
                })
            }
        </div>
    }

    return (
        <>
            {/* //Para no tener que poner un div, que si no el html es complicado */}
            <FiltroProductos updateAno={updateAno} />
            {contenido}
        </>
    )
}
export default Productos;