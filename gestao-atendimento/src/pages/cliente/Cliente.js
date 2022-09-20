import React, { useState, useEffect, useRef } from "react";
import ClienteList from "./ClienteList";
import ClienteForm from "./ClienteForm";
import ClienteSrv from "../../services/ClienteSrv";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";


function Cliente() {
  const toastRef = useRef();
  <Toast ref={toastRef} />;
  
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    onClickAtualizar();
  }, []);

  const onClickAtualizar = () => {
    ClienteSrv.listar()
      .then((response) => {
        setClientes(response.data);
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
    idcliente: null,
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
  };
  const [cliente, setCliente] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const inserir = () => {
    setCliente(initialState);
    setEditando(true);
  };
  const salvar = () => {
    if (cliente.idcliente == null) {
      ClienteSrv.incluir(cliente).then((response) => {
        setEditando(false); onClickAtualizar(); 
        toastRef.current.show({severity: "success", summary: "Salvou", life: 1000,});
        }).catch((e) => {
          toastRef.current.show({severity: "error",summary: e.message, life: 1000,});
      });
    } else {// alteração 
      ClienteSrv.alterar(cliente).then((response) => {setEditando(true); onClickAtualizar();
          toastRef.current.show({severity: "success",summary: "Salvou",life: 1000,});
        })
        .catch((e) => {toastRef.current.show({severity: "error",summary: e.message,life: 1000,});
        });
    }
  };
  const cancelar = () => {
    setEditando(false);
  };
  const editar = (idcliente) => {
    setCliente(clientes.filter((cliente) => cliente.idcliente === idcliente)[0]);
    setEditando(true);
  };
  
  const excluir = (idcliente) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(idcliente),
    });
  };
  const excluirConfirm = (idcliente) => {
    ClienteSrv.excluir(idcliente).then((response) => {onClickAtualizar();
        toastRef.current.show({severity: "success", summary: "Excluído", life: 1000});
      })
      .catch((e) => {toastRef.current.show({severity: "error", summary: e.message, life: 1000});
      });
  };
  if (!editando) {
    return (
      <div className="App">
        <ConfirmDialog />
        <ClienteList
          clientes={clientes}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ClienteForm
          cliente={cliente}
          setCliente={setCliente}
          salvar={salvar}
          cancelar={cancelar}
        />
      </div>
    );
  }
}
export default Cliente;