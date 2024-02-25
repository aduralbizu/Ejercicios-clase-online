import Producto from "./Producto";

function Productos(props) {
    return (
        <div>
            <Producto producto={props.productos[0]} />
            <Producto producto={props.productos[1]} />
            <Producto producto={props.productos[2]} />
        </div>
    )
}
export default Productos;