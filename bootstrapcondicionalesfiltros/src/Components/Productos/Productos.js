import Producto from "./Producto";
import FiltroProductos from "./FiltroProductos";
import { useState } from "react";
import { Alert } from "react-bootstrap";

function Productos(props) {
    const [ano, setAno] = useState(''); //Estado inicial: Vacío

    const updateAno = (ano) => {
        setAno(ano);
    }

    const productosFiltrados = props.productos.filter((element) => { //Con esto hago el filtrado de productos que se van a presentar según ano. Ano lo actualiza el hijo FiltradoProducto.js
        if (ano !== '') {
            return element.fecha.getFullYear().toString() === ano;
        }
        return true; //Todos los años lo van a cumplir
    }) //Ano se va actualizando a tiempo real, y esto se va filtrando con una sola línea

    let contenido = <Alert variant="primary">No hay productos</Alert>; //Contenido condicional

    if (productosFiltrados.length > 0) {
        contenido = <div>
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