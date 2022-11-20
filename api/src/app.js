const express = require("express");
const cors = require("cors");
const app = express();

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
app.use(cors());

app.use(index);

app.use("/api", funcionarioRoute);

const jwt = require("jsonwebtoken");

app.use(function (req, res, next) {
  // interceptar as requisições a validar o token
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(403).send({
        message: "Não possui token de autenticação. Acesso não autorizado!",
      });
    jwt.verify(token, process.env.JWT_PRIV_KEY, function (err, decoded) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: "Token inválido. Acesso não autorizado!",
        });
      // estando tudo certo guarda no request para uso posterior
      req.email = decoded.email;
      req.senha = decoded.senha;
      next();
    });
  } catch (error) {
    res.status(400).send("Erro no token de autenticação!");
  }
});

app.use("/api", clienteRoute);
app.use("/api", tipoProdutoRoute);
app.use("/api", tipoServicoRoute);
app.use("/api", produtoRoute);
app.use("/api", servicoRoute);
app.use("/api", atendimentoRoute);
app.use("/api", atendimentoProdutoRoute);
module.exports = app;
