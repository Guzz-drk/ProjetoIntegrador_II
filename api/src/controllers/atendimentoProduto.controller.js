const db = require("../config/database");

// Método responsável por criar um novo AtendimentoProduto

exports.createAtendimentoProduto = async (req, res) => {
  const { idAtendimentoAtm, idProdutoAtmPrd } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atendimentoProduto (idAtendimentoAtm, idProdutoAtmPrd) VALUES ($1, $2)",
    [idAtendimentoAtm, idProdutoAtmPrd]
  );

  res.status(201).send({
    message: "Atendimento Produto Adicionado Com Sucesso!",
    body: {
      Atendimento_Produto: { idAtendimentoAtm, idProdutoAtmPrd },
    },
  });
};

// Método responsável por listar todos os AtendimentoProdutos
exports.listAllAtendimentoProduto = async (req, res) => {
  const response = await db.query(
    "SELECT DISTINCT atendimentoProduto.idAtendimentoAtm as IdAtendimento, produto.descricao as Produto " +
    "from atendimentoProduto " +
    "inner join produto on atendimentoProduto.idProdutoAtmPrd = produto.idProduto ORDER BY idAtendimento ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um AtendimentoProduto pelo id
exports.findAtendimentoProdutoById = async (req, res) => {
  const atendimentoProdutoId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT atendimentoProduto.idAtendimentoAtm as Atendimento, produto.descricao as Produto " +
    "from atendimentoProduto " +
    "inner join produto on atendimentoProduto.idProdutoAtmPrd = produto.idProduto WHERE idAtendimentoAtm = $1",
    [atendimentoProdutoId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um AtendimentoProduto pelo id
exports.updateAtendimentoProdutoById = async (req, res) => {
  const atendimentoProdutoId = parseInt(req.params.id);
  const { idAtendimentoAtm, idProdutoAtmPrd } = req.body;

  const response = await db.query(
    "UPDATE atendimentoProduto SET idAtendimentoAtm = $1, idProdutoAtmPrd = $2 WHERE idAtendimentoPrd = $3",
    [idAtendimentoAtm, idProdutoAtmPrd, atendimentoProdutoId]
  );

  res.status(200).send({ message: "Atendimento Produto Atualizado Com Sucesso!" });
};

// Método responsável por excluir um AtendimentoProduto pelo id
exports.deleteAtendimentoProdutoById = async (req, res) => {
  const atendimentoProdutoId = parseInt(req.params.id);
  await db.query("DELETE FROM atendimentoProduto WHERE idAtendimentoAtm = $1", [
    atendimentoProdutoId,
  ]);

  res
    .status(200)
    .send({ message: "Atendimento Produto Excluido Com Sucesso!", atendimentoProdutoId });
};
