import React, { useState, useEffect, useRef } from "react";
import ServicoList from "./ServicoList";
import ServicoForm from "./ServicoForm";
import ServicoSrv from "../../services/ServicoSrv";
import TipoServicoSrv from "../../services/TipoServicoSrv";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function Servico() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [servicos, setServicos] = useState([]);
  const [tipoServicos, setTipoServicos] = useState([]);
  useEffect(() => {
    onClickAtualizar();
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
  }, []);

  const onClickAtualizar = () => {
    ServicoSrv.listar()
      .then((response) => {
        setServicos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Serviços Atualizados",
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
  const initialState = {
    idservico: null,
    descricao: "",
    obs: "",
    valor: "",
    categoria: "",
  };
  const [servico, setServico] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setServico(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (servico.idservico == null) {
      //inclusão
      ServicoSrv.incluir(servico)
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
      ServicoSrv.alterar(servico)
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
  const cancelar = () => {
    setEditando(false);
  };

  const editar = (id) => {
    setServico(servicos.filter((servico) => servico.idservico === id)[0]);
    setEditando(true);
  };

  const excluir = (id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(id),
    });
  };
  const excluirConfirm = (id) => {
    ServicoSrv.excluir(id)
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
        <ConfirmDialog />
        <ServicoList
          servicos={servicos}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <ServicoForm
          servico={servico}
          setServico={setServico}
          tipoServicos={tipoServicos}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default Servico;
