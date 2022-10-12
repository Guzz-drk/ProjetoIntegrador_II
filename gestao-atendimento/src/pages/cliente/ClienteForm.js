import React from "react";
import { InputText } from "primereact/inputtext";
// import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";

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
    <form onSubmit={handleSubmit(onSubmit)} className={estilo.div}>
      <div className={estilo.div}>
        <div className={estilo.margemtopo}>
          <h5 className={estilo.top}>Cadastro de Clientes</h5>
          <div style={{ textAlign: "center" }}>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label style={{ textAlign: "center" }} htmlFor="nome">
                    Nome
                  </label>
                  <InputText
                    name="nome"
                    {...register("nome", {
                      required: {
                        value: true,
                        message: "O nome é obrigatório!",
                      },
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
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
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
                      <span style={{ color: "red" }}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="cpf">
                      CPF
                    </label>
                    <InputText
                      name="cpf"
                      {...register("cpf", {
                        required: {
                          value: true,
                          message: "O cpf é obrigatório!",
                        },
                        maxLength: {
                          value: 100,
                          message: "O cpf pode ter no máximo 100 caracteres!",
                        },
                        minLength: {
                          value: 10,
                          message: "O cpf deve ter no mínimo 10 caracteres!",
                        },
                      })}
                      defaultValue={props.cliente.cpf}
                      onChange={handleInputChange}
                    />
                    {errors.cpf && (
                      <span style={{ color: "red" }}>{errors.cpf.message}</span>
                    )}
                    {/* <InputMask
                      name="cpf"
                      defaultValue={props.cliente.cpf}
                      onChange={handleInputChange}
                      mask="999.999.999-99"
                    />
                    {errors.cpf && (
                      <span style={{ color: "red" }}>{errors.cpf.message}</span>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="telefone">
                      Telefone
                    </label>
                    <InputText
                      name="telefone"
                      {...register("telefone", {
                        required: {
                          value: true,
                          message: "O telefone é obrigatório!",
                        },
                        maxLength: {
                          value: 100,
                          message:
                            "O telefone pode ter no máximo 100 caracteres!",
                        },
                        minLength: {
                          value: 10,
                          message:
                            "O telefone deve ter no mínimo 10 caracteres!",
                        },
                      })}
                      defaultValue={props.cliente.telefone}
                      onChange={handleInputChange}
                    />
                    {errors.telefone && (
                      <span style={{ color: "red" }}>
                        {errors.telefone.message}
                      </span>
                    )}
                    {/* <InputMask
                      name="telefone"
                      defaultValue={props.cliente.telefone}
                      onChange={handleInputChange}
                      mask="(99) 99999-9999"
                    />
                    {errors.telefone && (
                      <span style={{ color: "red" }}>
                        {errors.telefone.message}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={estilo.botao}>
            <div className={estilo.margemcampo}>
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
      </div>
    </form>
  );
};
export default ClienteForm;
