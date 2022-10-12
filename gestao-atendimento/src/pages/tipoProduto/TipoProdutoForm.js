import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";

const TipoProdutoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoProduto({ ...props.tipoProduto, [name]: value });
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
          <h5 className={estilo.top}>Cadastro de Tipos de Produtos</h5>
          <div style={{ textAlign: "center" }}>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label style={{ textAlign: "center" }} htmlFor="descricao">
                    descricao
                  </label>
                  <InputText
                    name="descricao"
                    defaultValue={props.tipoProduto.descricao}
                    onChange={handleInputChange}
                  />
                  {errors.descricao && (
                    <span style={{ color: "red" }}>
                      {errors.descricao.message}
                    </span>
                  )}
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
      </div>
    </form>
  );
};
export default TipoProdutoForm;
