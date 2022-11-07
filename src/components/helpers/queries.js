const URL = process.env.REACT_APP_API_CAFE;
// peticion GET para obtener el listado de todos los productos o un producto
// peticion POST le pedimos a la api crear un producto (generalmente en formato JSON), tambien se usa en el login
// peticion PUT cuando le pedimos a la api que modifique un producto
// peticion DELETE cuando le pedimos a la api borrar un producto

export const consultarAPI = async () => {
  // console.log(URL)
  try {
    const respuesta = await fetch(URL);
    const listaProductos = await respuesta.json();
    return listaProductos;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const obtenerProductoAPI = async (id) => {
  // console.log(URL)
  try {
    const respuesta = await fetch(URL + "/" + id);
    const producto = {
      dato: await respuesta.json(),
      status: respuesta.status,
    };
    return producto;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearProductoAPI = async (producto, token) => {
  // console.log(URL)
  try {
    const respuesta = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // envio el token en el header personalizado
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const borrarProductoAPI = async (id,token) => {
  // console.log(URL)
  try {
    const respuesta = await fetch(URL + "/" + id, {
      method: "DELETE",
      headers: {
        // envio el token en el header personalizado
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editarProductoAPI = async (id, producto,token) => {
  // console.log(URL)
  try {
    const respuesta = await fetch(URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return false;
  }
};
