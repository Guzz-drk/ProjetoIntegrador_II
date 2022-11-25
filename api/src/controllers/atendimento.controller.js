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
//Método responsável por listar os atendimentos diarios.
exports.findAtendimentoHoje = async (req, res) => {
  const response = await db.query(
    "SELECT atendimento.datahora, atendimento.idatendimento, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario, atendimento.status as status " +
      "from atendimento inner join servico on atendimento.idservicoatm = servico.idservico " +
      "inner join cliente on atendimento.idclienteatm = cliente.idcliente " +
      "inner join funcionario on atendimento.idfuncionarioatm = funcionario.idfuncionario  where cast(atendimento.datahora as date) = current_date and status = 'Aguardando'"
  );
  res.status(200).send(response.rows);
};

exports.findConcluido = async (req, res) => {
  const response = await db.query(
    "SELECT atendimento.datahora, atendimento.idatendimento, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario, atendimento.status as status " +
      "from atendimento inner join servico on atendimento.idservicoatm = servico.idservico " +
      "inner join cliente on atendimento.idclienteatm = cliente.idcliente " +
      "inner join funcionario on atendimento.idfuncionarioatm = funcionario.idfuncionario  where status = 'Concluido'"
  );
  res.status(200).send(response.rows);
};

// Método responsável por listar todos os Atendimentos
exports.listAllAtendimento = async (req, res) => {
  let atendimentos = [];
  const response = await db.query(
    " SELECT atendimento.datahora, atendimento.idatendimento, servico.descricao as servico, cliente.nome as cliente, funcionario.nome as funcionario," +
      " atendimento.status as status, atend.quantidadeproduto as quantidade, atend.prodvalorvenda, " +
      " (select sum(quantidadeproduto * prodvalorvenda) from atendimentoproduto where idatendimentoatm = atendimento.idatendimento) as valorTotal" +
      " from atendimento inner join servico on atendimento.idservicoatm = servico.idservico" +
      " inner join cliente on atendimento.idclienteatm = cliente.idcliente" +
      " inner join funcionario on atendimento.idfuncionarioatm = funcionario.idfuncionario" +
      " left join atendimentoproduto atend on atend.idatendimentoatm = atendimento.idatendimento" +
      " where status = 'Aguardando' ORDER BY idatendimento ASC"
  );
  // console.log(response);
  atendimentos = response.rows.filter((atendimento, index, self) => {
    return (
      index ===
      self.findIndex((t) => t.idatendimento === atendimento.idatendimento)
    );
  });
  response.rows.forEach((item) => {
    atendimentos.forEach((atendimento) => {
      if (atendimento.idatendimento === item.idatendimento) {
        if (!atendimento.itens) {
          atendimento.itens = [];
        }
        atendimento.itens.push({
          id: item.id,
          prodvalorvenda: item.prodvalorvenda,
          quantidadeproduto: item.quantidadeproduto,
        });
      }
    });
  });
  res.status(200).send(
    atendimentos.map((atendimento) => ({
      ...atendimento,
      prodvalorvenda: undefined,
      quantidadeproduto: undefined,
    }))
  );
};

exports.updateStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const response = await db.query(
    "UPDATE atendimento SET status = $1 WHERE idatendimento = $2",
    [status, id]
  );
  res.status(200).send({ message: "Status Atualizado Com Sucesso!" });
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
