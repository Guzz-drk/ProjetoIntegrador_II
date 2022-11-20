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
  const { handleSubmit } = useForm();
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
            id="email"
            value={acesso.email}
            onChange={handleInputChange}
          />
          <br></br>
          <InputText
            type="password"
            name="senha"
            id="senha"
            value={acesso.senha}
            onChange={handleInputChange}
          />
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
