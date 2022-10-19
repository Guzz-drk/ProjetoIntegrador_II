const db = require("../config/database");

// Método responsável por criar um novo Tipo de Servico

exports.createTipoServico = async (req, res) => {
  const { descricao } = req.body;
  const { rows } = await db.query(
    "INSERT INTO tipoServico (descricao) VALUES ($1)",
    [descricao]
  );

  res.status(201).send({
    message: "Tipo Servico Adicionado Com Sucesso!",
    body: {
      tipoServico: { descricao },
    },
  });
};

// Método responsável por listar todos os Tipos de Servicos
exports.listAllTipoServico = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM tipoServico ORDER BY descricao ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Tipo de Servico pelo id
exports.findTipoServicoById = async (req, res) => {
  const idtiposervico = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM tipoServico WHERE idTipoServico = $1",
    [idtiposervico]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Tipo de Servico pelo id
exports.updateTipoServicoById = async (req, res) => {
  const idtiposervico = parseInt(req.params.id);
  const { descricao } = req.body;

  const response = await db.query(
    "UPDATE tipoServico SET descricao = $1 WHERE idTipoServico = $2",
    [descricao, idtiposervico]
  );

  res.status(200).send({ message: "Tipo Servico Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Tipo de Servico pelo id
exports.deleteTipoServicoById = async (req, res) => {
  const idtiposervico = parseInt(req.params.id);
  await db.query("DELETE FROM tipoServico WHERE idTipoServico = $1", [
    idtiposervico,
  ]);

  res
    .status(200)
    .send({ message: "Tipo Servico Excluido Com Sucesso!", idtiposervico });
};
