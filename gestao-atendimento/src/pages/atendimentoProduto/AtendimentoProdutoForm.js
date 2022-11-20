import React from "react";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const AtendimentoProdutoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtendimentoProduto({ ...props.atendimentoProduto, [name]: value });
  };

  const { handleSubmit } = useForm();

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={estilo.div}>
      <div className={estilo.div}>
        <div className={estilo.margemtopo}>
          <h5 className={estilo.top}>Atendimento Produto</h5>
          <div style={{ textAlign: "center" }}>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label
                    style={{ textAlign: "center" }}
                    htmlFor="idatendimentoatm"
                  >
                    Atendimento
                  </label>
                  <Dropdown
                    name="idatendimentoatm"
                    value={props.atendimentoProduto.idatendimentoatm}
                    options={props.atendimentos}
                    optionLabel="cliente"
                    optionValue="idatendimento"
                    onChange={handleInputChange}
                    placeholder="Selecione o Atendimento"
                  />
                </div>
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className={estilo.margemcampo}>
                <div className="field col-12 md:col-12">
                  <label
                    style={{ textAlign: "center" }}
                    htmlFor="idprodutoatmprd"
                  >
                    Produto
                  </label>
                  <Dropdown
                    name="idprodutoatmprd"
                    value={props.atendimentoProduto.idprodutoatmprd}
                    options={props.produtos}
                    optionLabel="descricao"
                    optionValue="idproduto"
                    onChange={handleInputChange}
                    placeholder="Selecione o Produto"
                  />
                </div>
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className={estilo.margemcampo}>
                <div className="field col-12 md:col-12">
                  <label
                    style={{ textAlign: "center" }}
                    htmlFor="quantidadeproduto"
                  >
                    Quantidade
                  </label>
                  <InputText
                    name="quantidadeproduto"
                    defaultValue={props.atendimentoProduto.quantidadeproduto}
                    onChange={handleInputChange}
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
              className="p-button-raised p-button-rounded p-button-info"
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
    </form>
  );
};
export default AtendimentoProdutoForm;
