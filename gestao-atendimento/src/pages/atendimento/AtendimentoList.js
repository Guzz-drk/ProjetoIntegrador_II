import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import estilo from "../../components/css/AtendimentoList.module.css";
import { Link } from "react-router-dom";
import atendimentoPDF from "../relatorios/atendimento/atendimento";

const template2 = {
  layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 4, value: 4 },
      { label: 10, value: 10 },
    ];

    return (
      <React.Fragment>
        <span
          className="mx-1"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Itens por página:{" "}
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
  CurrentPageReport: (options) => {
    return (
      <span
        style={{
          color: "var(--text-color)",
          userSelect: "none",
          width: "120px",
          textAlign: "center",
        }}
      >
        {options.first} - {options.last} of {options.totalRecords}
      </span>
    );
  },
};

const dateBodyTemplate = (rowData) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(rowData.datahora));
};

const AtendimentoList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.editar(rowData.idatendimento)}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-trash"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.excluir(rowData.idatendimento)}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          icon="pi pi-check"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.editarStatus(rowData.idatendimento)}
        ></Button>
        <Button
          style={{
            marginLeft: "1vh",
          }}
          type="button"
          className="p-button-raised p-button-rounded p-button-info"
        >
          <Link
            to={`/atendimentoProduto?id=${rowData.idatendimento}`}
            style={{ color: "white", fontFamily: "Hebbo" }}
          >
            Produtos
          </Link>
        </Button>
      </React.Fragment>
    );
  };
  return (
    <div className={estilo.main}>
      <div className={estilo.div}>
        <h4 className={estilo.h4} style={{ marginLeft: "-5vh" }}>
          Lista de Atendimentos
        </h4>
        <Button
          type="button"
          icon="pi pi-sync"
          style={{ marginLeft: "30vh" }}
          className="p-button-raised p-button-rounded p-button-info"
          onClick={props.onClickAtualizar}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-plus"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={props.inserir}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-calendar"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={props.onClickHoje}
          label="Para Hoje"
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-calendar"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={props.onClickConcluido}
          label="Concluídos"
        ></Button>
        <Button
          type="button"
          icon="pi pi-file-pdf"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={(e) => atendimentoPDF(props.atendimentos)}
          label="PDF"
          style={{ float: "right", fontFamily: "Hebbo" }}
        ></Button>
        <p></p>
        <div className="card">
          <DataTable
            style={{ fontFamily: "Hebbo" }}
            value={props.atendimentos}
            selectionMode="single"
            responsiveLayout="scroll"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-12"
            emptyMessage="Nenhum atendimento encontrado!!"
          >
            <Column field="idatendimento" header="ID" sortable></Column>
            <Column
              body={dateBodyTemplate}
              header="Data e Hora"
              sortable
              filter
            ></Column>
            <Column field="servico" header="Serviço" sortable filter></Column>
            <Column field="cliente" header="Cliente" sortable filter></Column>
            <Column
              field="funcionario"
              header="Funcionário"
              sortable
              filter
            ></Column>
            <Column field="status" header="Status" sortable filter></Column>
            <Column
              field="valortotal"
              header="R$Produtos"
              sortable
              filter
            ></Column>
            <Column header="Operações" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoList;
