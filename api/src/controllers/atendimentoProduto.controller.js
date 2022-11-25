const db = require("../config/database");

// Método responsável por criar um novo AtendimentoProduto

exports.createAtendimentoProduto = async (req, res) => {
  const { idatendimentoatm, idprodutoatmprd, quantidadeproduto } = req.body;
  const response = await db.query(
    "select produto.descricao, produto.valorvenda from produto where idproduto = $1",
    [idprodutoatmprd]
  );
  const { rows } = await db.query(
    "INSERT INTO atendimentoProduto (idatendimentoatm, idprodutoatmprd, quantidadeproduto, prodnome, prodvalorvenda) VALUES ($1, $2, $3, $4, $5)",
    [
      idatendimentoatm,
      idprodutoatmprd,
      Number(quantidadeproduto),
      response.rows[0].descricao,
      response.rows[0].valorvenda,
    ]
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
    "SELECT atendimentoProduto.idatendimentoprd, atendimentoProduto.idatendimentoatm as atendimentoCliente, " +
      "cliente.nome as cliente, produto.descricao as produto, atendimentoProduto.quantidadeproduto, atendimentoProduto.prodvalorvenda as valor " +
      "from atendimentoproduto inner join produto on atendimentoProduto.idprodutoatmprd = produto.idproduto inner join atendimento " +
      "on atendimentoproduto.idatendimentoatm = atendimento.idatendimento inner join cliente on atendimento.idclienteatm = cliente.idcliente " +
      "where atendimentoProduto.idatendimentoatm = $1",
    [req.params.id]
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um AtendimentoProduto pelo id
exports.findAtendimentoProdutoById = async (req, res) => {
  const idatendimentoprd = parseInt(req.params.id);
  const response = await db.query(
    "select atendimentoproduto.quantidadeproduto, produto.descricao as produto from atendimentoproduto inner join produto " +
      "on atendimentoproduto.idprodutoatmprd = produto.idproduto where idatendimentoprd = $1"[
        idatendimentoprd
      ]
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
