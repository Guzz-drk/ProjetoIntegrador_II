import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import estilo from "../../components/css/FuncionarioList.module.css";
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

const ClienteList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.editar(rowData.idfuncionario)}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-trash"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.excluir(rowData.idfuncionario)}
        ></Button>
      </React.Fragment>
    );
  };
  return (
    <div className={estilo.main}>
      <div className={estilo.div}>
        <h4 className={estilo.h4} style={{ marginLeft: "2vh" }}>
          Lista de Funcionários
        </h4>
        <Button
          type="button"
          icon="pi pi-sync"
          style={{ marginLeft: "44%" }}
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
        <p></p>
        <div className="card">
          <DataTable
            style={{ fontFamily: "Hebbo" }}
            value={props.funcionarios}
            selectionMode="single"
            responsiveLayout="scroll"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
          >
            <Column field="idfuncionario" header="ID" sortable></Column>
            <Column field="nome" header="Nome" sortable filter></Column>
            <Column field="email" header="Email" sortable filter></Column>
            <Column field="telefone" header="Telefone" sortable filter></Column>
            <Column field="cpf" header="CPF" sortable filter></Column>
            <Column header="Operações" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ClienteList;
