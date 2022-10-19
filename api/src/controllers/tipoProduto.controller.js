const db = require("../config/database");

// Método responsável por criar um novo Tipo de Produto

exports.createTipoProduto = async (req, res) => {
  const { descricao } = req.body;
  const { rows } = await db.query(
    "INSERT INTO tipoProduto (descricao) VALUES ($1)",
    [descricao]
  );

  res.status(201).send({
    message: "Tipo Produto Adicionado Com Sucesso!",
    body: {
      tipoProduto: { descricao },
    },
  });
};

// Método responsável por listar todos os Tipos de Produtos
exports.listAllTipoProduto = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM tipoProduto ORDER BY descricao ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Tipo de Produto pelo id
exports.findTipoProdutoById = async (req, res) => {
  const idtipoproduto = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM tipoProduto WHERE idTipoProduto = $1",
    [idtipoproduto]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Tipo de Produto pelo id
exports.updateTipoProdutoById = async (req, res) => {
  const idtipoproduto = parseInt(req.params.id);
  const { descricao } = req.body;

  const response = await db.query(
    "UPDATE tipoProduto SET descricao = $1 WHERE idtipoproduto = $2",
    [descricao, idtipoproduto]
  );

  res.status(200).send({ message: "Tipo Produto Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Tipo de Produto pelo id
exports.deleteTipoProdutoById = async (req, res) => {
  const idtipoproduto = parseInt(req.params.id);
  await db.query("DELETE FROM tipoProduto WHERE idTipoProduto = $1", [
    idtipoproduto,
  ]);

  res
    .status(200)
    .send({ message: "Tipo Produto Excluido Com Sucesso!", idtipoproduto });
};
