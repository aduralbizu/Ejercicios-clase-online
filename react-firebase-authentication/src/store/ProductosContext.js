import React from "react"

const ProductosContext = React.createContext({
    borraProducto: ()=>{} //Inicializamos con método vacío, así tipamos
})

export default ProductosContext