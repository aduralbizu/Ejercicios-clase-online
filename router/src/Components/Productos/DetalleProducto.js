import { useParams, useSearchParams } from "react-router-dom";

const DetalleProducto = () => {
    const parametros = useParams();

    const [formato, setFormato] = useSearchParams();

    return(
        <>
        <h2>DETALLE DEL PRODUCTO = {parametros.id}</h2>
        <p>Información del producto.</p>
        <p>Formato de plantilla= {formato.get('format')}</p>
        </>
    )
}

export default DetalleProducto;