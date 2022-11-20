import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";

const FuncionarioForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setFuncionario({ ...props.funcionario, [name]: value });
  };

  const [cpfMask, setCpfMask] = useState(props.funcionario.cpf);
  const [telefoneMask, setTelefoneMask] = useState(props.funcionario.telefone);
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
          <h5 className={estilo.top}>Cadastro de Funcionários</h5>
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
                    defaultValue={props.funcionario.nome}
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
                      defaultValue={props.funcionario.email}
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
                    <InputMask
                      name="cpf"
                      mask="999.999.999-99"
                      value={cpfMask}
                      onChange={(e) => {
                        setCpfMask(e.value);
                        props.setFuncionario({
                          ...props.funcionario,
                          cpf: e.value,
                        });
                      }}
                    />
                    {errors.cpf && (
                      <span style={{ color: "red" }}>{errors.cpf.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="telefone">
                      Telefone
                    </label>
                    <InputMask
                      name="telefone"
                      mask="(99) 99999-9999"
                      value={telefoneMask}
                      onChange={(e) => {
                        setTelefoneMask(e.value);
                        props.setFuncionario({
                          ...props.funcionario,
                          telefone: e.value,
                        });
                      }}
                    />
                    {errors.telefone && (
                      <span style={{ color: "red" }}>
                        {errors.telefone.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="senha">
                      Senha
                    </label>
                    <InputText
                      name="senha"
                      {...register("senha", {
                        required: {
                          value: true,
                          message: "O senha é obrigatório!",
                        },
                        maxLength: {
                          value: 100,
                          message: "O senha pode ter no máximo 100 caracteres!",
                        },
                        minLength: {
                          value: 10,
                          message: "O nome deve ter no mínimo 10 caracteres!",
                        },
                      })}
                      defaultValue={props.funcionario.senha}
                      onChange={handleInputChange}
                    />
                    {errors.senha && (
                      <span style={{ color: "red" }}>
                        {errors.senha.message}
                      </span>
                    )}
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
                className="p-button-raised p-button-rounded p-button-info "
                label="Salvar"
                onClick={props.salvar}
              ></Button>
              <Button
                type="button"
                icon="pi pi-times-circle"
                className="p-button-raised p-button-rounded p-button-info"
                label="Cancelar"
                onClick={props.cancelar}
                style={{ float: "right" }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FuncionarioForm;
