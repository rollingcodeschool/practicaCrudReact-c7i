import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../helpers/queriesLogin";
import Swal from "sweetalert2";

const Login = ({setUsuarioLogueado}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (datos) => {
    login(datos).then((respuesta) => {
      if (respuesta) {
        Swal.fire(
          "Bienvenido",
          `Gracias por contar con nosotros, ${datos.usuario}`,
          "success"
        );
        localStorage.setItem(
          "tokenCafeBenito",
          JSON.stringify(respuesta)
        );
        setUsuarioLogueado(respuesta)
        navigate("/administrar");
      } else {
        Swal.fire(
          "Error",
          `Contraseña incorrecta, vuelva a intentarlo`,
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
        
              />
              <Form.Text className="text-danger">
                {errors.usuario?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Ingrese un password"
                {...register("password", {
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
    
              />
              <Form.Text className="text-danger mb-2">
                {errors.password?.message}
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
