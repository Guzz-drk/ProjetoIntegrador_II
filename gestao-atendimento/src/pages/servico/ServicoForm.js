import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";
import { Dropdown } from "primereact/dropdown";

const ServicoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setServico({ ...props.servico, [name]: value });
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
          <h5 className={estilo.top}>Cadastro de Serviços</h5>
          <div style={{ textAlign: "center" }}>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label style={{ textAlign: "center" }} htmlFor="descricao">
                    Descrição
                  </label>
                  <InputText
                    name="descricao"
                    {...register("descricao", {
                      required: {
                        value: true,
                        message: "descricao é obrigatório!",
                      },
                      maxLength: {
                        value: 100,
                        message: "descricao pode ter no máximo 100 caracteres!",
                      },
                      minLength: {
                        value: 2,
                        message: "descricao pode ter no mínimo 2 caracteres!",
                      },
                    })}
                    defaultValue={props.servico.descricao}
                    onChange={handleInputChange}
                  />
                  {errors.descricao && (
                    <span style={{ color: "red" }}>
                      {errors.descricao.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="obs">
                      Observação
                    </label>
                    <InputText
                      name="obs"
                      defaultValue={props.servico.obs}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="field col-12 md:col-12">
                    <label style={{ textAlign: "center" }} htmlFor="valor">
                      Valor
                    </label>
                    <InputText
                      name="valor"
                      defaultValue={props.servico.valor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="p-fluid grid formgrid">
                <div className={estilo.margemcampo}>
                  <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-12">
                      <label htmlFor="categoria">Tipo de Serviço</label>
                      <Dropdown
                        name="categoria"
                        value={props.servico.categoria}
                        options={props.tipoServicos}
                        optionLabel="descricao"
                        optionValue="idtiposervico"
                        onChange={handleInputChange}
                        placeholder="Selecione o Tipo de Serviço"
                      />
                    </div>
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
export default ServicoForm;
