import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import estilo from "../../components/css/ProdutoList.module.css";
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
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => props.editar(rowData.idatendimento)}
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-rounded p-button-text"
          onClick={() => props.excluir(rowData.idatendimento)}
        ></Button>
      </React.Fragment>
    );
  };
  return (
    <div className={estilo.main}>
      <div className={estilo.div}>
        <h4 className={estilo.h4}>Atendimento-Produto</h4>
        <Button
          type="button"
          icon="pi pi-sync"
          style={{ marginLeft: "41%" }}
          className="p-button-rounded p-button-text"
          onClick={props.onClickAtualizar}
        ></Button>
        <Button
          type="button"
          icon="pi pi-plus"
          className="p-button-rounded p-button-text"
          onClick={props.inserir}
        ></Button>
        <Button type="button" className="p-button-rounded p-button-text">
          <Link to="/atendimento">Voltar</Link>
        </Button>
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
          >
            <Column
              field="idatendimento"
              header="Atendimento"
              sortable
              filter
            ></Column>
            <Column field="produto" header="Produto" sortable filter></Column>
            <Column
              field="quantidade"
              header="Quantidade"
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

export default AtendimentoProdutoList;
