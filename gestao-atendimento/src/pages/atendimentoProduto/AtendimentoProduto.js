import React, { useState, useEffect, useRef } from "react";
import AtendimentoProdutoList from "./AtendimentoProdutoList";
import AtendimentoProdutoForm from "./AtendimentoProdutoForm";
import AtendimentoProdutoSrv from "../../services/AtendimentoProdutoSrv";
import AtendimentoSrv from "../../services/AtendimentoSrv";
import ProdutoSrv from "../../services/ProdutoSrv";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useSearchParams } from "react-router-dom";

function AtendimentoProduto() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [atendimentoProdutos, setAtendimentoProdutos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [URLSearchParams] = useSearchParams();
  useEffect(() => {
    onClickAtualizar();
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
    ProdutoSrv.listar()
      .then((response) => {
        setProdutos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Produtos Atualizados",
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
    const id = URLSearchParams.get("id");
    AtendimentoProdutoSrv.listar(id)
      .then((response) => {
        setAtendimentoProdutos(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Tipos de Produtos Atualizados",
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
    idatendimentoprd: null,
    idatendimentoatm: Number(URLSearchParams.get("id")),
    idprodutoatmprd: null,
    quantidadeproduto: null,
  };
  const [atendimentoProduto, setAtendimentoProduto] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setAtendimentoProduto(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (atendimentoProduto.idatendimentoprd == null) {
      //inclusão
      AtendimentoProdutoSrv.incluir(atendimentoProduto)
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
      AtendimentoProdutoSrv.alterar(atendimentoProduto)
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
    setAtendimentoProduto(
      atendimentoProdutos.filter(
        (atendimentoProduto) => atendimentoProduto.idatendimentoprd === id
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
    AtendimentoProdutoSrv.excluir(id)
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
        <AtendimentoProdutoList
          atendimentoProdutos={atendimentoProdutos}
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
        <AtendimentoProdutoForm
          atendimentoProduto={atendimentoProduto}
          setAtendimentoProduto={setAtendimentoProduto}
          produtos={produtos}
          atendimentos={atendimentos}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default AtendimentoProduto;
