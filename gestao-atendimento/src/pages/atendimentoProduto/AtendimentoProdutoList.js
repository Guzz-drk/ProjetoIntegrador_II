import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import estilo from "../../components/css/AtendimentoProdutoList.module.css";
import { Link } from "react-router-dom";

const template2 = {
  layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
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

const AtendimentoProdutoList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.excluir(rowData.idatendimentoprd)}
        ></Button>
      </React.Fragment>
    );
  };
  return (
    <div className={estilo.main}>
      <div className={estilo.div}>
        <h4 className={estilo.h4} style={{ marginLeft: "1vh" }}>
          Atendimento-Produto
        </h4>
        <Button
          type="button"
          icon="pi pi-sync"
          style={{ marginLeft: "45vh" }}
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
          type="button"
          className="p-button-raised p-button-rounded p-button-info"
          style={{ marginLeft: "1vh" }}
        >
          <Link
            to="/atendimento"
            style={{ color: "white", fontFamily: "Hebbo" }}
          >
            Voltar
          </Link>
        </Button>
        <p></p>
        <div className="card">
          <DataTable
            value={props.atendimentoProdutos}
            selectionMode="single"
            responsiveLayout="scroll"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
            style={{ fontFamily: "Hebbo" }}
            emptyMessage="Nenhum registro encontrado"
          >
            <Column
              field="idatendimentoprd"
              header="ID"
              sortable
              filter
            ></Column>
            <Column
              field="atendimentocliente"
              header="Atendimento"
              sortable
              filter
            ></Column>
            <Column field="cliente" header="Cliente" sortable filter></Column>
            <Column field="produto" header="Produto" sortable filter></Column>
            <Column
              field="quantidadeproduto"
              header="Quantidade"
              sortable
              filter
            ></Column>
            <Column field="valor" header="Valor" sortable filter></Column>
            <Column header="Operação" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoProdutoList;
