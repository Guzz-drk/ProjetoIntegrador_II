const db = require("../config/database");

// Método responsável por criar um novo AtendimentoProduto

exports.createAtendimentoProduto = async (req, res) => {
  const { idatendimentoatm, idprodutoatmprd, quantidadeproduto } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atendimentoProduto (idatendimentoatm, idprodutoatmprd, quantidadeproduto) VALUES ($1, $2, $3)",
    [idatendimentoatm, idprodutoatmprd, quantidadeproduto]
  );

  res.status(201).send({
    message: "Atendimento Produto Adicionado Com Sucesso!",
    body: {
      Atendimento_Produto: {
        idatendimentoatm,
        idprodutoatmprd,
        quantidadeproduto,
      },
    },
  });
};

// Método responsável por listar todos os AtendimentoProdutos
exports.listAllAtendimentoProduto = async (req, res) => {
  const response = await db.query(
    "SELECT atendimentoProduto.idatendimentoprd, atendimentoProduto.idatendimentoatm as atendimentoCliente, cliente.nome as cliente, produto.descricao as produto, " +
      "atendimentoProduto.quantidadeproduto from atendimentoproduto " +
      "inner join produto on atendimentoProduto.idprodutoatmprd = " +
      "produto.idproduto inner join atendimento on atendimentoproduto.idatendimentoatm = atendimento.idatendimento " +
      "inner join cliente on atendimento.idclienteatm = cliente.idcliente ORDER BY idAtendimento ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um AtendimentoProduto pelo id
exports.findAtendimentoProdutoById = async (req, res) => {
  const atendimentoProdutoId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT atendimentoProduto.idAtendimentoAtm as atendimento, produto.descricao as Produto " +
      "from atendimentoProduto " +
      "inner join produto on atendimentoProduto.idProdutoAtmPrd = produto.idProduto WHERE idAtendimentoAtm = $1",
    [atendimentoProdutoId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um AtendimentoProduto pelo id
exports.updateAtendimentoProdutoById = async (req, res) => {
  const idatendimentoprd = parseInt(req.params.id);
  const { idatendimentoatm, idprodutoatmprd, quantidadeproduto } = req.body;

  const response = await db.query(
    "UPDATE atendimentoProduto SET idatendimentoatm = $1, idprodutoatmprd = $2, quantidadeproduto = $3 WHERE idatendimentoprd = $4",
    [idatendimentoatm, idprodutoatmprd, idatendimentoprd, quantidadeproduto]
  );

  res
    .status(200)
    .send({ message: "Atendimento Produto Atualizado Com Sucesso!" });
};

// Método responsável por excluir um AtendimentoProduto pelo id
exports.deleteAtendimentoProdutoById = async (req, res) => {
  const idatendimentoprd = parseInt(req.params.id);
  await db.query("DELETE FROM atendimentoProduto WHERE idatendimentoprd = $1", [
    idatendimentoprd,
  ]);

  res.status(200).send({
    message: "Atendimento Produto Excluido Com Sucesso!",
    idatendimentoprd,
  });
};
