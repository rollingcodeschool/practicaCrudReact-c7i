
import { Button } from "react-bootstrap";
// opcion 2
// const ItemProducto = ({id, nombreProducto, categoria, imagen, precio}) => {
// opcion 3
const ItemProducto = ({producto}) => {
const {id, nombreProducto, categoria, imagen, precio} = {...producto} 

  return (
    <tr>
      <td>{id}</td>
      {/* <td>{props.producto.nombreProducto}</td> */}
      {/* <td>{producto.nombreProducto}</td> */}
      <td>{nombreProducto}</td>
      <td>${precio}</td>
      <td>{imagen}</td>
      <td>{categoria}</td>
      <td>
        <Button variant="warning">
          Editar
        </Button>
        <Button variant="danger">
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
