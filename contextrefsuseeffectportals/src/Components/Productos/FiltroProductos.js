import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const FiltroProductos = (props) => {

    const anoHandler = (event) => {
        // alert(event.target.value);
        props.updateAno(event.target.value);
    }

    return (
        <> 
        <Container>
            <Row>
                <Col md={4}>
                {/* md={4}: Este es un prop (propiedad) que se le pasa al componente <Col>. En este caso, md se refiere a pantallas medianas, lo que significa que estas columnas se aplicarán cuando el ancho de la pantalla sea igual o mayor que el breakpoint medio (medium breakpoint) definido en React-Bootstrap. El número 4 indica que esta columna ocupará 4 unidades del total de 12 unidades del sistema de rejilla, lo que significa que ocupará un tercio del ancho total disponible. */}
                    <Form.Label>Seleccione año</Form.Label>
                    <Form.Select onChange={anoHandler}>
                        <option value=''>Ver todos</option>
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                        <option value='2025'>2025</option>
                    </Form.Select></Col>
            </Row>
        </Container>

        </>
    )
}
export default FiltroProductos;