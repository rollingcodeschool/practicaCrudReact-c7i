import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { crearUsuarioAPI } from '../helpers/queriesLogin'

const Registro = ({setUsuarioLogueado}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = (datos) => {
   
      crearUsuarioAPI(datos).then((respuesta) => {
        if (respuesta.status === 201) {
          setUsuarios([
            ...usuarios,
            {
              usuario: datos.usuario,
              email: datos.email,
              pass: datos.pass,
              id: datos.usuario,
            },
          ]);
          Swal.fire(
            `Te registraste correctamente, ${usuario}`,
            "Inicia sesion con tu nueva cuenta.",
            "success"
          );
          //guardar la sesion del usuario en localstorage
            localStorage.setItem('tokenCafeBenito', JSON.stringify(datos));
            //actualizar el state usuarioLogueado
            setUsuarioLogueado(datos)
            // redireccionamos
            navigate("/administrar");
        } else {
          Swal.fire(
            `Hubo un error inesperado`,
            "Intentelo nuevamente en breve.",
            "error"
          );
        }
      });
    
  };

  return (
    <div className="mt-5 mainSection">
      <h3 className="text-center">Registro</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Ingrese un nombre de usuario"
                {...register("usuario", {
                  required: "Debe ingresar un nombre de usuario",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "El nombre no debe tener mas de 30 caracteres",
                  },
                  pattern: {
                    value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
                    message: "Debe ingresar un nombre de usaurio valido",
                  },
                })}
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
              />
              <Form.Text className="text-danger">
                {errors.usuario?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "Debe ingresar un email",
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Debe ingresar un formato valido",
                  },
                })}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-danger mb-2">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Ingrese un password"
                {...register("pass", {
                  required: "Debe ingresar una contraseña",
                  minLength: {
                    value: 8,
                    message: "Su contraseña debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "Su contraseña debe tener como 30 caracteres como maximo",
                  },
                })}
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
              <Form.Text className="text-danger mb-2">
                {errors.pass?.message}
              </Form.Text>
            </Form.Group>
            <div className="row">
              <Button
                className="btn btn-dark btn-lg btn-block mb-2"
                type="submit"
              >
                Registrarse
              </Button>
              <button
                className="btn btn-danger btn-sm mt-2"
                type="button"
                onClick={() => navigate("/login/iniciarSesion")}
              >
                ¿Ya estas registrado?
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
