const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: '*'}));
// Rotas da API:
const index = require("./routes/index");
const clienteRoute = require("./routes/cliente.routes");
const funcionarioRoute = require("./routes/funcionario.routes");
const tipoProdutoRoute = require("./routes/tipoProduto.routes");
const tipoServicoRoute = require("./routes/tipoServico.routes");
const produtoRoute = require("./routes/produto.routes");
const servicoRoute = require("./routes/servico.routes");
const atendimentoRoute = require("./routes/atendimento.routes");
const atendimentoProdutoRoute = require("./routes/atendimentoProduto.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));


app.use(index);
app.use("/api", clienteRoute);
app.use("/api", funcionarioRoute);
app.use("/api", tipoProdutoRoute);
app.use("/api", tipoServicoRoute);
app.use("/api", produtoRoute);
app.use("/api", servicoRoute);
app.use("/api", atendimentoRoute);
app.use("/api", atendimentoProdutoRoute);

module.exports = app;
