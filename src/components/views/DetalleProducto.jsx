import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { obtenerProductoAPI } from "../helpers/queries";

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({});

    useEffect(() => {
        obtenerProductoAPI(id).then((respuesta) => {
          if (respuesta.status === 200) {
            console.log(respuesta);
            //cargar los datos 
            setProducto(respuesta)
          }
        });
      }, []);

    return (
        <>
            <Card className="container border rounded my-3 flex-row">
                    <Card.Img
                        variant="start"
                        src={producto.dato?.imagen}
                    />
                    <Card.Body>
                        <div className="anchoDetalleProducto">
                            <Card.Title>{producto.dato?.nombreProducto}</Card.Title>
                            <hr />
                            <Badge bg="success">{producto.dato?.categoria}</Badge>
                            <Card.Text className="mt-3 fw-bold">Precio: ${producto.dato?.precio}</Card.Text>
                        </div>
                    </Card.Body>
            </Card>
        </>
    );
};

export default DetalleProducto;
