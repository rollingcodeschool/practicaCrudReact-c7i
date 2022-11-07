import { Routes, Route } from "react-router-dom";
import Administrador from "../views/Administrador";
import CrearProducto from "../views/admiProductos/CrearProducto";
import EditarProducto from "../views/admiProductos/EditarProducto";
import Registro from "../views/Registro";


const RutasAdmin = ({ setUsuarioLogueado }) => {
  return (
    <>
      <Routes>
        {/* /administrar/ */}
        <Route
          exact
          path="/"
          element={<Administrador></Administrador>}
        ></Route>
        <Route
          exact
          path="/crear"
          element={<CrearProducto></CrearProducto>}
        ></Route>
        <Route
          exact
          path="/editar/:id"
          element={<EditarProducto></EditarProducto>}
        ></Route>
        <Route
          exact
          path="/registro"
          element={
            <Registro setUsuarioLogueado={setUsuarioLogueado}></Registro>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdmin;
