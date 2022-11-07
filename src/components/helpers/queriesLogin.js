const URL = process.env.REACT_APP_API_CAFE_USER

export const consultarUserAPI =  async () => {
    try{
        const respuesta = await fetch(URL)
        const listaUsuarios = await respuesta.json()
        return listaUsuarios
        //agregar aqui la logica para buscar el usuario por mail y pass
        // si lo encuentro retorno el objeto
        //caso contrario retorno null u objeto vacio
    } catch(e){
        console.log(e)
    }
}

export const crearUsuarioAPI =  async (usuario) => {
    try{
        const respuesta = await fetch(URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        return respuesta
    } catch(e){
        console.log(e)
    }
}

export const login = async (usuario) =>{
    try{

        console.log(usuario)
      //verificar si el usuario existe
      const respuesta = await fetch(URL);
      const listaUsuarios = await respuesta.json();
      //buscar cual usuario tiene mi mail
      const usuarioBuscado = listaUsuarios.find((itemUsuario)=> itemUsuario.email === usuario.usuario )
      if(usuarioBuscado){
        console.log('email encontrado')
        //verificar el password
        if(usuarioBuscado.password === usuario.password ){
          return usuarioBuscado
        }
      }else{
        console.log('el mail no existe')
        return
      }
    }catch(error){
      console.log('errores en el login')
      return
    }
  }