import React, { useState, useEffect, useRef } from "react";
import TipoProdutoList from "./TipoProdutoList";
import TipoProdutoForm from "./TipoProdutoForm";
import TipoProdutoSrv from "../../services/TipoProdutoSrv";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function TipoProduto() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [tipoProdutos, setTipoProdutos] = useState([]);
  useEffect(() => {
    onClickAtualizar();
  }, []);

  const onClickAtualizar = () => {
    TipoProdutoSrv.listar()
      .then((response) => {
        setTipoProdutos(response.data);
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
    idtipoproduto: null,
    descricao: "",
  };
  const [tipoProduto, setTipoProduto] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setTipoProduto(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (tipoProduto.idtipoproduto == null) {
      //inclusão
      TipoProdutoSrv.incluir(tipoProduto)
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
      TipoProdutoSrv.alterar(tipoProduto)
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
    setTipoProduto(
      tipoProdutos.filter((tipoProduto) => tipoProduto.idtipoproduto === id)[0]
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
    TipoProdutoSrv.excluir(id)
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
        <TipoProdutoList
          tipoProdutos={tipoProdutos}
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
        <TipoProdutoForm
          tipoProduto={tipoProduto}
          setTipoProduto={setTipoProduto}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default TipoProduto;
