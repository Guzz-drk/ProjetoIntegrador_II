import React, { useState, useEffect, useRef } from "react";
import FuncionarioList from "./FuncionarioList";
import FuncionarioForm from "./FuncionarioForm";
import FuncionarioSrv from "../../services/FuncionarioSrv";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function Funcionario() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [funcionarios, setFuncionarios] = useState([]);
  useEffect(() => {
    onClickAtualizar();
  }, []);

  const onClickAtualizar = () => {
    FuncionarioSrv.listar()
      .then((response) => {
        setFuncionarios(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Clientes Atualizados",
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
    idfuncionario: null,
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
    senha: "",
  };
  const [funcionario, setFuncionario] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setFuncionario(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (funcionario.idfuncionario == null) {
      //inclusão
      FuncionarioSrv.incluir(funcionario)
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
            severity: "warn",
            summary: "Dados obrigatórios não preenchidos",
            life: 4000,
          });
        });
    } else {
      // alteração
      FuncionarioSrv.alterar(funcionario)
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

  const editar = (idfuncionario) => {
    setFuncionario(
      funcionarios.filter(
        (funcionario) => funcionario.idfuncionario === idfuncionario
      )[0]
    );
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
    FuncionarioSrv.excluir(id)
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
        <FuncionarioList
          funcionarios={funcionarios}
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
        <FuncionarioForm
          funcionario={funcionario}
          setFuncionario={setFuncionario}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default Funcionario;
