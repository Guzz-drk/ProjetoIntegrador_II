import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const ClienteForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setCliente({ ...props.cliente, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5 style={{ textAlign: "center" }}>Cadastro de Clientes</h5>
          <div
            className="container"
            style={{ marginLeft: "38%", textAlign: "center" }}
          >
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{ textAlign: "center" }} htmlFor="nome">
                  Nome
                </label>
                <InputText
                  name="nome"
                  {...register("nome", {
                    required: { value: true, message: "O nome é obrigatório!" },
                    maxLength: {
                      value: 100,
                      message: "O nome pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O nome pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.cliente.nome}
                  onChange={handleInputChange}
                />
                {errors.nome && (
                  <span style={{ color: "red" }}>{errors.nome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{ textAlign: "center" }} htmlFor="email">
                  Email
                </label>
                <InputText
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "O email é obrigatório!",
                    },
                    maxLength: {
                      value: 100,
                      message: "O email pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 10,
                      message: "O nome deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.cliente.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{ textAlign: "center" }} htmlFor="cpf">
                  CPF
                </label>
                <InputText
                  name="cpf"
                  defaultValue={props.cliente.cpf}
                  onChange={handleInputChange}
                />
                {errors.cpf && (
                  <span style={{ color: "red" }}>{errors.cpf.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{ textAlign: "center" }} htmlFor="telefone">
                  Telefone
                </label>
                <InputText
                  name="telefone"
                  defaultValue={props.cliente.telefone}
                  onChange={handleInputChange}
                />
                {errors.telefone && (
                  <span style={{ color: "red" }}>
                    {errors.telefone.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "32em" }}>
            <Button
              type="submit"
              icon="pi pi-save"
              className="p-button-rounded p-button-text "
              label="Salvar"
              onClick={props.salvar}
            ></Button>
            <Button
              type="button"
              icon="pi pi-times-circle"
              className="p-button-rounded p-button-text"
              label="Cancelar"
              onClick={props.cancelar}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ClienteForm;
