import React, { useState, useEffect, useRef } from "react";
import ProdutoList from "./ProdutoList";
import ProdutoForm from "./ProdutoForm";
import ProdutoSrv from "../../services/ProdutoSrv";
import TipoProdutoSrv from "../../services/TipoProdutoSrv";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

function Produto() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;

  const [produtos, setProdutos] = useState([]);
  const [tipoProdutos, setTipoProdutos] = useState([]);
  useEffect(() => {
    onClickAtualizar();
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
  }, []);

  const onClickAtualizar = () => {
    ProdutoSrv.listar()
      .then((response) => {
        setProdutos(response.data);
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
    idproduto: null,
    descricao: "",
    quantidade: 0,
    valorcompra: 1,
    valorvenda: 1,
    categoria: 0,
  };
  const [produto, setProduto] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setProduto(initialState);
    setEditando(true);
  };

  //metodo para salvar e editar cliente
  const salvar = () => {
    if (produto.idproduto == null) {
      //inclusão
      ProdutoSrv.incluir(produto)
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
      ProdutoSrv.alterar(produto)
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
    setProduto(produtos.filter((produto) => produto.idproduto === id)[0]);
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
    ProdutoSrv.excluir(id)
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
        <ProdutoList
          produtos={produtos}
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
        <ProdutoForm
          produto={produto}
          setProduto={setProduto}
          tipoProdutos={tipoProdutos}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }
}
export default Produto;
