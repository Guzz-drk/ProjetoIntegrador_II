const db = require("../config/database");

// Método responsável por criar um novo Atendimento

exports.createAtendimento = async (req, res) => {
  const { datahora, idservicoatm, idclienteatm, idfuncionarioatm } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atendimento (dataHora, idServicoAtm, idClienteAtm, idFuncionarioAtm) VALUES ($1, $2, $3, $4)",
    [datahora, idservicoatm, idclienteatm, idfuncionarioatm]
  );

  res.status(201).send({
    message: "Atendimento Adicionado Com Sucesso!",
    body: {
      Atendimento: { datahora, idservicoatm, idclienteatm, idfuncionarioatm },
    },
  });
};

// Método responsável por listar todos os Atendimentos
exports.listAllAtendimento = async (req, res) => {
  const response = await db.query(
    "SELECT atendimento.datahora, atendimento.idatendimento, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario " +
      "from atendimento inner join servico on atendimento.idservicoatm = servico.idservico " +
      "inner join cliente on atendimento.idclienteatm = cliente.idcliente " +
      "inner join funcionario on atendimento.idfuncionarioatm = funcionario.idfuncionario ORDER BY idatendimento ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um Atendimento pelo id
exports.findAtendimentoById = async (req, res) => {
  const idatendimento = parseInt(req.params.id);
  const response = await db.query(
    "SELECT atendimento.datahora, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario " +
      "from atendimento inner join servico on atendimento.idservicoatm = servico.idservico " +
      "inner join cliente on atendimento.idclienteatm = cliente.idcliente " +
      "inner join funcionario on atendimento.idfuncionarioatm = funcionario.idfuncionario WHERE idatendimento = $1 ORDER BY idatendimento ASC",
    [idatendimento]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um Atendimento pelo id
exports.updateAtendimentoById = async (req, res) => {
  const idatendimento = parseInt(req.params.id);
  const { datahora, idservicoatm, idclienteatm, idfuncionarioatm } = req.body;

  const response = await db.query(
    "UPDATE atendimento SET datahora = $1, idservicoatm = $2, idclienteatm = $3, idfuncionarioatm = $4 WHERE idatendimento = $5",
    [datahora, idservicoatm, idclienteatm, idfuncionarioatm, idatendimento]
  );

  res.status(200).send({ message: "Atendimento Atualizado Com Sucesso!" });
};

// Método responsável por excluir um Atendimento pelo id
exports.deleteAtendimentoById = async (req, res) => {
  const idatendimento = parseInt(req.params.id);
  await db.query("DELETE FROM atendimento WHERE idatendimento = $1", [
    idatendimento,
  ]);

  res
    .status(200)
    .send({ message: "Atendimento Excluido Com Sucesso!", idatendimento });
};
