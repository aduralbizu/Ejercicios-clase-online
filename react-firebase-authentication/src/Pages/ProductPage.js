import ProductosContext from "../store/ProductosContext";
import { useState } from "react";
import NuevoProducto from "../Components/NuevoProducto/NuevoProducto"
import Productos from "../Components/Productos/Productos"

const ProductPage = () => {

    const [productos, setProductos] = useState(
        [
            {
                id: Math.random().toString(),
                nombre: '111',
                precio: 45.4,
                fecha: new Date(2023, 2, 6)
            },
            {
                id: Math.random().toString(),
                nombre: '222',
                precio: 45.4,
                fecha: new Date(2024, 2, 12)
            },
            {
                id: Math.random().toString(),
                nombre: '3333',
                precio: 45.4,
                fecha: new Date(2024, 5, 6)
            },
            {
                id: Math.random().toString(),
                nombre: 'Ratón óptico 4',
                precio: 45.4,
                fecha: new Date(2023, 5, 6)
            }
        ]
    )


    const addProducto = (producto) => {
        //setProductos(Productos.push(producto)) Lo que hace en realidad
        setProductos((prevproductos) => { //Funcion de actualización que recibe estado anterior. La función para actualizar el estado también puede recibir una función como argumento en lugar de un valor directo. Esta función recibirá el estado anterior como su primer argumento, y deberá devolver el nuevo estado basado en el estado anterior. Así es como funciona React
            return [producto, ...prevproductos] //Array que suma estado anterior más el nuevo producto
        });
    }

    const borraProducto = (id) => {
        // a=productos no, se crea el puntero a un nuevo Array
        let copiaProductos = [...productos]; //A shallow copy means constructing a new collection object and then populating it with references to the child objects found in the original. I
        copiaProductos = copiaProductos.filter((elemento) => { // Filter recorre todos los elementos, la función se ejecutará para todos. En aquellos elementos donde la comparación de la función sea verdadera, nos quedamos con el elemento
            return elemento.id !== id; //si es distinto, déjalo
        })
        setProductos(copiaProductos);
    }


    return (
        <>
            <ProductosContext.Provider value={{ borraProducto: borraProducto }}>
                <Productos productos={productos} borraProducto={borraProducto} />
            </ProductosContext.Provider>
        </>
    )
}

export default ProductPage;