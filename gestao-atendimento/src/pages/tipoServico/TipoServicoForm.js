import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import estilo from "../../components/css/Form.module.css";

const TipoServicoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoServico({ ...props.tipoServico, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={estilo.div}
      style={{ marginBottom: "27vh" }}
    >
      <div className={estilo.div}>
        <div className={estilo.margemtopo}>
          <h5 className={estilo.top}>Tipos de Serviços</h5>
          <div>
            <div className={estilo.margemcampo}>
              <div className="p-fluid grid formgrid">
                <div className="field col-12 md:col-12">
                  <label htmlFor="descricao">Descrição</label>
                  <InputText
                    name="descricao"
                    {...register("descricao", {
                      required: {
                        value: true,
                        message: "descrição é obrigatório!",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "Campo descrição pode ter no máximo 100 caracteres!",
                      },
                      minLength: {
                        value: 2,
                        message:
                          "Campo descrição pode ter no mínimo 2 caracteres!",
                      },
                    })}
                    defaultValue={props.tipoServico.descricao}
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
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default TipoServicoForm;
