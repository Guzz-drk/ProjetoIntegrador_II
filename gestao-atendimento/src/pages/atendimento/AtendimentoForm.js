import React from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";
import { Dropdown } from "primereact/dropdown";

const AtendimentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtendimento({ ...props.atendimento, [name]: value });
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={estilo.div}>
      <div className={estilo.div}>
        <div className={estilo.margemtopo}>
          <h5 className={estilo.top}>Atendimentos</h5>
          <div style={{ textAlign: "center" }}>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label style={{ textAlign: "center" }} htmlFor="datahora">
                    Data e Hora
                  </label>
                  <Calendar
                    name="datahora"
                    showTime
                    showIcon
                    dateFormat="dd/mm/yy"
                    hourFormat="24"
                    defaultValue={props.atendimento.datahora}
                    onChange={handleInputChange}
                  />
                  {errors.datahora && (
                    <span style={{ color: "red" }}>
                      {errors.datahora.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label
                      style={{ textAlign: "center" }}
                      htmlFor="idservicoatm"
                    >
                      Serviço
                    </label>
                    <Dropdown
                      name="idservicoatm"
                      value={props.atendimento.idservicoatm}
                      options={props.servicos}
                      optionLabel="descricao"
                      optionValue="idservico"
                      onChange={handleInputChange}
                      placeholder="Selecione o Serviço"
                    />
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label
                      style={{ textAlign: "center" }}
                      htmlFor="idclienteatm"
                    >
                      Cliente
                    </label>
                    <label htmlFor="idclienteatm">Cliente</label>
                    <Dropdown
                      name="idclienteatm"
                      value={props.atendimento.idclienteatm}
                      options={props.clientes}
                      optionLabel="nome"
                      optionValue="idcliente"
                      onChange={handleInputChange}
                      placeholder="Selecione o Cliente"
                    />
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label
                      style={{ textAlign: "center" }}
                      htmlFor="idfuncionarioatm"
                    >
                      Funcionário
                    </label>
                    <Dropdown
                      name="idfuncionarioatm"
                      value={props.atendimento.idfuncionarioatm}
                      options={props.funcionarios}
                      optionLabel="nome"
                      optionValue="idfuncionario"
                      onChange={handleInputChange}
                      placeholder="Selecione o Funcionário"
                    />
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
export default AtendimentoForm;
