import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { consultarAPI } from "../helpers/queries";
import ItemProducto from "./admiProductos/ItemProducto";

const Administrador = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    consultarAPI().then(
      (respuesta) => {
        //la respuesta es exitosa
        setProductos(respuesta);
      },
      (reason) => {
        console.log(reason);
        //mostrar un mensaje al usuario
        Swal.fire(
          'Ocurrio un error',
          'Intentelo nuevamente en unos minutos',
          'error'
        )
      }
    );
  }, []);

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Button to="/administrar/crear" className="btn btn-primary">
          Agregar
        </Button>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {/* aqui tengo que hacer un map */}
          <ItemProducto></ItemProducto>
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
