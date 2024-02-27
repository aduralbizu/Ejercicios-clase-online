import { useState } from "react";

const NuevoProducto = (props) => {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [fecha, setFecha] = useState('');

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
        setFecha(''); //Borro contenido interfaz
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Nombre</label>
                <input onChange={nombreHandler} type="text" value={nombre} />
            </div>
            <div>
                <label>Precio</label>
                <input onChange={precioHandler} type="number" value={precio} />
            </div>
            <div>
                <label>Fecha</label>
                <input onChange={fechaHandler} type="date" value={fecha}/>
            </div>
            <div>
                <button type="submit">AÑADIR PRODUCTO</button>
            </div>
        </form>
    )
}

export default NuevoProducto;