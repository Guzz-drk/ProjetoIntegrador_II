const db = require("../config/database");

// Método responsável por criar um novo Funcionario

exports.createFuncionario = async (req, res) => {
  const { nome, cpf, email, telefone, senha } = req.body;
  const { rows } = await db.query(
    "INSERT INTO funcionario (nome, cpf, email, telefone, senha) VALUES ($1, $2, $3, $4, $5)",
    [nome, cpf, email, telefone, senha]
  );

  res.status(201).send({
    message: "Funcionario Adicionado Com Sucesso!",
    body: {
      funcionario: { nome, cpf, email, telefone, senha },
    },
  });
};

// Método responsável por listar todos os Funcionarios
exports.listAllFuncionario = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM funcionario ORDER BY nome ASC"
  );
  res.status(200).send(response.rows);
};

// Método responsável por exibir um funcionario pelo id
exports.findFuncionarioById = async (req, res) => {
  const funcionarioId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM funcionario WHERE idFuncionario = $1",
    [funcionarioId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um funcionario pelo id
exports.updateFuncionarioById = async (req, res) => {
  const funcionarioId = parseInt(req.params.id);
  const { nome, cpf, email, telefone, senha } = req.body;

  const response = await db.query(
    "UPDATE funcionario SET nome = $1, cpf = $2, email = $3, telefone = $4, senha = $5 WHERE idFuncionario = $6",
    [nome, cpf, email, telefone, senha, funcionarioId]
  );

  res.status(200).send({ message: "Funcionario Atualizado Com Sucesso!" });
};

// Método responsável por excluir um funcionario pelo id
exports.deleteFuncionarioById = async (req, res) => {
  const funcionarioId = parseInt(req.params.id);
  await db.query("DELETE FROM funcionario WHERE idFuncionario = $1", [
    funcionarioId,
  ]);

  res
    .status(200)
    .send({ message: "Funcionario Excluido Com Sucesso!", funcionarioId });
};
