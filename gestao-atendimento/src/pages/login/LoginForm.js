import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import LoginSrv from "../../services/LoginSrv";
import estilo from "../../components/css/Login.module.css";
import logo from "../../components/img/Barber-cuate.svg";
import "primeicons/primeicons.css";

const LoginForm = (props) => {
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setAcesso({ ...acesso, [id]: value });
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const toastRef = useRef();
  const [acesso, setAcesso] = useState({
    email: "",
    senha: "",
  });
  const onSubmit = (data) => {
    LoginSrv.login(acesso).then((response) => {
      let token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        console.log(token);
        window.location = "/";
      } else {
        toastRef.current.show({
          severity: "error",
          summary: "Erro no login",
          life: 5000,
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className={estilo.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={estilo.d}>
          <h1 className={estilo.h}>Login</h1>
          <InputText
            type="text"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "O email é obrigatório",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email inválido",
              },
            })}
            id="email"
            value={acesso.email}
            onChange={handleInputChange}
          />
          <p></p>
          {errors.email && (
            <span
              className={estilo.error}
              style={{ color: "red", fontFamily: "Hebbo", fontWeight: "bold" }}
            >
              {errors.email.message}
            </span>
          )}
          <br></br>
          <InputText
            type="password"
            name="senha"
            {...register("senha", {
              required: {
                value: true,
                message: "A senha é obrigatória",
              },
            })}
            id="senha"
            value={acesso.senha}
            onChange={handleInputChange}
          />
          <p></p>
          {errors.senha && (
            <span
              className={estilo.error}
              style={{ color: "red", fontFamily: "Hebbo", fontWeight: "bold" }}
            >
              {errors.senha.message}
            </span>
          )}
          <br />
          <div>
            <Button
              type="submit"
              label="Entrar"
              className="p-button-raised p-button-rounded p-button-info"
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
