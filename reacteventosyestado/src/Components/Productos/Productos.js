import Producto from "./Producto";

function Productos(props) {
    return (
        <div>
            {
                props.productos.map((elemento) => {
                    return (
                        <Producto key={elemento.id} producto={elemento} />
                    )
                })
            }
            {/* para cada elemento del array, quiero renderizar un producto  */}
        </div>
    )
}
export default Productos;