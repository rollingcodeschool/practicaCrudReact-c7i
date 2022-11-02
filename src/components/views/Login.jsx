import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { consultarUserAPI } from "../helpers/queriesLogin";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  
  const onSubmit = (datos) => {
    consultarUserAPI().then((respuesta) => {
        console.log(respuesta)
      const encontrarUser = respuesta.find(
        (user) => user.usuario === datos.usuario
      );
      const encontrarEmail = respuesta.find(
        (user) => user.email === datos.email
      );
      if (encontrarUser || encontrarEmail) {
        if (encontrarUser.pass === datos.pass) {
          Swal.fire(
            "Bienvenido",
            `Gracias por contar con nosotros, ${encontrarUser.usuario}`,
            "success"
          );
          localStorage.setItem("tokenCafeBenito", JSON.stringify(encontrarUser.usuario));
          navigate("/administrar");
        } else {
          Swal.fire(
            "Error",
            `Contraseña incorrecta, vuelva a intentarlo`,
            "error"
          );
        }
      } else {
        Swal.fire(
          "Usuario o email incorrecto",
          `No encontramos un usuario o email con ese nombre, vuelve a intentarlo`,
          "error"
        );
      }
    });
  };

  return (
    <div className="mt-5 mainSection">
      <h3 className="text-center">Login de acceso</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre de usuario o email"
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
                Iniciar sesion
              </Button>
              <button
                className="btn btn-danger btn-sm mt-2"
                type="button"
                onClick={() => navigate("/login")}
              >
                ¿No estas registrado?
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;