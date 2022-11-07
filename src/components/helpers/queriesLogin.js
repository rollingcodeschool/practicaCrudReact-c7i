const URL = process.env.REACT_APP_API_CAFE_USER;

export const consultarUserAPI = async () => {
  try {
    const respuesta = await fetch(URL);
    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
    //agregar aqui la logica para buscar el usuario por mail y pass
    // si lo encuentro retorno el objeto
    //caso contrario retorno null u objeto vacio
  } catch (e) {
    console.log(e);
  }
};

export const crearUsuarioAPI = async (usuario) => {
  try {
    const respuesta = await fetch(URL + "/nuevo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (e) {
    console.log(e);
  }
};

export const login = async (usuario) => {
  try {
    console.log(usuario);
    const respuesta = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos = await respuesta.json();
    return {
      status: respuesta.status,
      mensaje: datos.mensaje,
      nombre: datos.nombre,
      token: datos.token,
      uid: datos.uid,
    };
  } catch (error) {
    console.log("errores en el login");
    return;
  }
};
