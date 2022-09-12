const db = require("../config/database");

// Método responsável por criar um novo Servico

exports.createServico = async (req, res) => {
  const { descricao, obs, valor, categoria } = req.body;
  const { rows } = await db.query(
    "INSERT INTO servico (descricao, obs, valor, categoria) VALUES ($1, $2, $3, $4)",
    [descricao, obs, valor, categoria]
  );

  res.status(201).send({
    message: "Servico Adicionado Com Sucesso!",
    body: {
      Servico: { descricao, obs, valor, categoria },
    },
  });
};

// Método responsável por listar todos os Servicos
exports.listAllServico = async (req, res) => {
  const response = await db.query(
    "SELECT servico.*, tipoServico.descricao as categoria " +
      "from servico inner join tipoServico on servico.categoria = tipoServico.idTipoServico" +
      " ORDER BY descricao ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Servico pelo id
exports.findServicoById = async (req, res) => {
  const servicoId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT servico.*, tipoServico.descricao as categoria " +
      "from servico inner join tipoServico on servico.categoria = tipoServico.idTipoServico" +
      " WHERE idServico = $1",
    [servicoId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Servico pelo id
exports.updateServicoById = async (req, res) => {
  const servicoId = parseInt(req.params.id);
  const { descricao, obs, valor, categoria } = req.body;

  const response = await db.query(
    "UPDATE servico SET descricao = $1, obs = $2, valor = $3, categoria = $4 WHERE idServico = $5",
    [descricao, obs, valor, categoria, servicoId]
  );

  res.status(200).send({ message: "Servico Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Servico pelo id
exports.deleteServicoById = async (req, res) => {
  const servicoId = parseInt(req.params.id);
  await db.query("DELETE FROM servico WHERE idServico = $1", [servicoId]);

  res.status(200).send({ message: "Servico Excluido Com Sucesso!", servicoId });
};
