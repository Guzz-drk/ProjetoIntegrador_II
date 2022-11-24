import React, { useState, useEffect, useRef } from "react";
import AtendimentoList from "./AtendimentoList";
import AtendimentoForm from "./AtendimentoForm";
import AtendimentoSrv from "../../services/AtendimentoSrv";
import ServicoSrv from "../../services/ServicoSrv";
import ClienteSrv from "../../services/ClienteSrv";
import FuncionarioSrv from "../../services/FuncionarioSrv";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function Atendimento() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [atendimentos, setAtendimentos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  useEffect(() => {
    onClickAtualizar();
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
    ClienteSrv.listar().then((response) => {
      setClientes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Clientes Atualizados",
        life: 1000,
      });
    });
    FuncionarioSrv.listar().then((response) => {
      setFuncionarios(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Funcionários Atualizados",
        life: 1000,
      });
    });
  }, []);

  const onClickAtualizar = () => {
    AtendimentoSrv.listar()
      .then((response) => {
        setAtendimentos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Atendimentos Atualizados",
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

  const onClickHoje = () => {
    AtendimentoSrv.listarHoje()
      .then((response) => {
        setAtendimentos(response.data);
        toastRef.current.show({
          severity: "info",
          summary: "Atendimentos para Hoje Atualizados",
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

  const onClickConcluido = () => {
    AtendimentoSrv.listarConcluido()
      .then((response) => {
        setAtendimentos(response.data);
        toastRef.current.show({
          severity: "info",
          summary: "Atendimentos Concluídos Atualizados",
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
    idatendimento: null,
    datahora: "",
    idservicoatm: "",
    idclienteatm: "",
    idfuncionarioatm: "",
  };
  const [atendimento, setAtendimento] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setAtendimento(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (atendimento.idatendimento == null) {
      //inclusão
      AtendimentoSrv.incluir(atendimento)
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
      AtendimentoSrv.alterar(atendimento)
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
    setAtendimento(
      atendimentos.filter((atendimento) => atendimento.idatendimento === id)[0]
    );
    setEditando(true);
  };

  const editarStatus = (id) => {
    let atend = {
      idatendimento: id,
      status: "Concluido",
    };
    AtendimentoSrv.alterarStatus(atend)
      .then((response) => {
        setEditando(false);
        onClickAtualizar();
        toastRef.current.show({
          severity: "info",
          summary: "Concluido",
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
  // setAtendimento(
  //   atendimentos.filter((atendimento) => atendimento.idatendimento === id)[0]
  // );
  // setEditando(true);

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
    AtendimentoSrv.excluir(id)
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
        <AtendimentoList
          atendimentos={atendimentos}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
          editarStatus={editarStatus}
          onClickConcluido={onClickConcluido}
          onClickHoje={onClickHoje}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <AtendimentoForm
          atendimento={atendimento}
          setAtendimento={setAtendimento}
          servicos={servicos}
          clientes={clientes}
          funcionarios={funcionarios}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default Atendimento;
