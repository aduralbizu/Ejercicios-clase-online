import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const DetalleProducto = () => {
    const parametros = useParams();
    const [formato, setFormato] = useSearchParams();
    const [producto, setProducto] = useState([]);

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
                console.log(arrayProducto);
                setProducto(arrayProducto[0]); //así metemos el json
            })
    }, [])

    return (
        <>
            <h2>Nombre: {producto.nombre}</h2>
            <h2>DETALLE DEL PRODUCTO = {parametros.id}</h2>
            <p>Información del producto: {producto.descripcion}</p>
            <p>Precio: {producto.precio}</p>
            <p>Fecha: {producto.fecha}</p>
            <p>Formato de plantilla= {formato.get('format')}</p>
        </>
    )
}

export default DetalleProducto;