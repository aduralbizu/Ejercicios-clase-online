import { useSearchParams } from "react-router-dom";

const Contact = () => {
    const [parametrosSearch, setParametrosSearch] = useSearchParams();

    return (
        <>
            <h2>CONTACTO</h2>
            <p>Contacto de la sede de {parametrosSearch.get('sede')}</p>
            <p>Esta es nuestra dirección y nuestra persona de contacto es {parametrosSearch.get('persona')} </p>
        </>
    )
}

export default Contact;