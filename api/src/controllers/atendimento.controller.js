const db = require("../config/database");

// Método responsável por criar um novo Atendimento

exports.createAtendimento = async (req, res) => {
  const { dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atendimento (dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm) VALUES ($1, $2, $3, $4)",
    [dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm]
  );

  res.status(201).send({
    message: "Atendimento Adicionado Com Sucesso!",
    body: {
      Atendimento: { dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm },
    },
  });
};

// Método responsável por listar todos os Atendimentos
exports.listAllAtendimento = async (req, res) => {
  const response = await db.query(
    "SELECT atendimento.dataHora, atendimento.idAtendimento, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario " +
      "from atendimento inner join servico on atendimento.idServicoAtm = servico.idServico " +
      "inner join cliente on atendimento.idClienteAtm = cliente.idCliente " +
      "inner join funcionario on atendimento.idFuncionarioAtm = funcionario.idFuncionario ORDER BY idAtendimento ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Atendimento pelo id
exports.findAtendimentoById = async (req, res) => {
  const atendimentoId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT atendimento.dataHora, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario " +
      "from atendimento inner join servico on atendimento.idServicoAtm = servico.idServico " +
      "inner join cliente on atendimento.idClienteAtm = cliente.idCliente " +
      "inner join funcionario on atendimento.idFuncionarioAtm = funcionario.idFuncionario WHERE idAtendimento = $1 ORDER BY idAtendimento ASC",
    [atendimentoId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Atendimento pelo id
exports.updateAtendimentoById = async (req, res) => {
  const atendimentoId = parseInt(req.params.id);
  const { dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm } = req.body;

  const response = await db.query(
    "UPDATE atendimento SET dataHora = $1, idServicoAtm = $2, idClienteAtm = $3, idFuncionarioAtm = $4 WHERE idAtendimento = $5",
    [dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm, atendimentoId]
  );

  res.status(200).send({ message: "Atendimento Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Atendimento pelo id
exports.deleteAtendimentoById = async (req, res) => {
  const atendimentoId = parseInt(req.params.id);
  await db.query("DELETE FROM atendimento WHERE idAtendimento = $1", [
    atendimentoId,
  ]);

  res
    .status(200)
    .send({ message: "Atendimento Excluido Com Sucesso!", atendimentoId });
};
