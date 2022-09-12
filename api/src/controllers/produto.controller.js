const db = require("../config/database");

// Método responsável por criar um novo Produto

exports.createProduto = async (req, res) => {
  const { descricao, quantidade, valorCompra, valorVenda, categoria } =
    req.body;
  const { rows } = await db.query(
    "INSERT INTO produto (descricao, quantidade, valorCompra, valorVenda, categoria) VALUES ($1, $2, $3, $4, $5)",
    [descricao, quantidade, valorCompra, valorVenda, categoria]
  );

  res.status(201).send({
    message: "Produto Adicionado Com Sucesso!",
    body: {
      Produto: { descricao, quantidade, valorCompra, valorVenda, categoria },
    },
  });
};

// Método responsável por listar todos os Produtos
exports.listAllProduto = async (req, res) => {
  const response = await db.query(
    "SELECT produto.*, tipoProduto.descricao as categoria" +
      " from produto inner join tipoProduto on produto.categoria = tipoProduto.idTipoProduto" +
      " ORDER BY descricao ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Produto pelo id
exports.findProdutoById = async (req, res) => {
  const produtoId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT produto.*, tipoProduto.descricao as categoria" +
      " from produto inner join tipoProduto on produto.categoria = tipoProduto.idTipoProduto" +
      " WHERE idProduto = $1",
    [produtoId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Produto pelo id
exports.updateProdutoById = async (req, res) => {
  const produtoId = parseInt(req.params.id);
  const { descricao, quantidade, valorCompra, valorVenda, categoria } =
    req.body;

  const response = await db.query(
    "UPDATE produto SET descricao = $1, quantidade = $2, valorCompra = $3, valorVenda = $4, categoria = $5 WHERE idProduto = $6",
    [descricao, quantidade, valorCompra, valorVenda, categoria, produtoId]
  );

  res.status(200).send({ message: "Produto Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Produto pelo id
exports.deleteProdutoById = async (req, res) => {
  const produtoId = parseInt(req.params.id);
  await db.query("DELETE FROM produto WHERE idProduto = $1", [produtoId]);

  res.status(200).send({ message: "Produto Excluido Com Sucesso!", produtoId });
};
