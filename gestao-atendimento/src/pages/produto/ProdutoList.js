import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import estilo from "../../components/css/ProdutoList.module.css";
import { Link } from "react-router-dom";
import produtoPDF from "../relatorios/produto/produto";

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

const ProdutoList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.editar(rowData.idproduto)}
        ></Button>
        <Button
          style={{ marginLeft: "1vh" }}
          type="button"
          icon="pi pi-trash"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={() => props.excluir(rowData.idproduto)}
        ></Button>
      </React.Fragment>
    );
  };
  return (
    <div className={estilo.main}>
      <div className={estilo.div}>
        <h4 className={estilo.h4} style={{ marginLeft: "3vh" }}>
          Lista de Produtos
        </h4>
        <Button
          type="button"
          icon="pi pi-sync"
          style={{ marginLeft: "41%" }}
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
          className="p-button-raised p-button-rounded p-button-info"
        >
          <Link
            to="/tipoProduto"
            style={{ color: "white", fontFamily: "Hebbo" }}
          >
            Tipo Produto
          </Link>
        </Button>
        <Button
          type="button"
          icon="pi pi-file-pdf"
          className="p-button-raised p-button-rounded p-button-info"
          onClick={(e) => produtoPDF(props.produtos)}
          label="PDF"
          style={{ float: "right", fontFamily: "Hebbo" }}
        ></Button>
        <p></p>
        <div className="card">
          <DataTable
            value={props.produtos}
            selectionMode="single"
            responsiveLayout="scroll"
            paginator
            paginatorTemplate={template2}
            rows={5}
            paginatorClassName="justify-content-center"
            className="mt-6"
            style={{ fontFamily: "Hebbo" }}
          >
            <Column field="idproduto" header="ID" sortable></Column>
            <Column
              field="descricao"
              header="Descrição"
              sortable
              filter
            ></Column>
            <Column
              field="quantidade"
              header="Quantidade"
              sortable
              filter
            ></Column>
            <Column
              field="valorcompra"
              header="Valor de Compra"
              body={(rowData) => {
                return rowData.valorcompra.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
              }}
              sortable
              filter
            ></Column>
            <Column
              field="valorvenda"
              header="Valor de Venda"
              body={(rowData) => {
                return rowData.valorvenda.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
              }}
              sortable
              filter
            ></Column>
            <Column
              field="tipoproduto"
              header="Categoria"
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

export default ProdutoList;
