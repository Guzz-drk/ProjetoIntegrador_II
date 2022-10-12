import React, { useState, useEffect, useRef } from "react";
import TipoServicoSrv from "../../services/TipoServicoSrv";
import TipoServicoList from "../tipoServico/TipoServicoList";
import TipoServicoForm from "../tipoServico/TipoServicoForm";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function TipoServico() {
  const [tipoServicos, setTipoServicos] = useState([]);
  const toastRef = useRef();

  const initialState = {
    idtiposervico: null,
    descricao: "",
  };
  const [tipoServico, setTipoServico] = useState(initialState);
  const [editando, setEditando] = useState(false);
  useEffect(() => {
    onClickAtualizar();
  }, []);

  const onClickAtualizar = () => {
    TipoServicoSrv.listar()
      .then((response) => {
        setTipoServicos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Tipos de Serviços Atualizados",
          life: 1000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 1000,
        });
      });
  };

  // operação inserir

  const inserir = () => {
    setTipoServico(initialState);
    setEditando(true);
  };

  const cancelar = () => {
    setEditando(false);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (tipoServico.idtiposervico == null) {
      //inclusão
      TipoServicoSrv.incluir(tipoServico)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else {
      // alteração
      TipoServicoSrv.alterar(tipoServico)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const editar = (id) => {
    setTipoServico(
      tipoServicos.filter((tipoServico) => tipoServico.idtiposervico === id)[0]
    );
    setEditando(true);
  };

  const excluir = (idtiposervico) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(idtiposervico),
    });
  };
  const excluirConfirm = (idtiposervico) => {
    TipoServicoSrv.excluir(idtiposervico)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 1000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 1000,
        });
      });
  };
  if (!editando) {
    return (
      <div>
        <Toast ref={toastRef} />
        <ConfirmDialog />
        <TipoServicoList
          tipoServicos={tipoServicos}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
      </div>
    );
  } else {
    return (
      <div>
        <TipoServicoForm
          tipoServico={tipoServico}
          setTipoServico={setTipoServico}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default TipoServico;
