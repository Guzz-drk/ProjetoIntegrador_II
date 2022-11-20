const db = require("../config/database");
const jwt = require("jsonwebtoken");
// Método responsável por criar um novo Funcionario, e validação de campo vazio

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
  const idfuncionario = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM funcionario WHERE idfuncionario = $1",
    [idfuncionario]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um funcionario pelo id
exports.updateFuncionarioById = async (req, res) => {
  const idfuncionario = parseInt(req.params.id);
  const { nome, cpf, email, telefone, senha } = req.body;

  const response = await db.query(
    "UPDATE funcionario SET nome = $1, cpf = $2, email = $3, telefone = $4, senha = $5 WHERE idfuncionario = $6",
    [nome, cpf, email, telefone, senha, idfuncionario]
  );

  res.status(200).send({ message: "Funcionario Atualizado Com Sucesso!" });
};

// Método responsável por excluir um funcionario pelo id
exports.deleteFuncionarioById = async (req, res) => {
  const idfuncionario = parseInt(req.params.id);
  await db.query("DELETE FROM funcionario WHERE idfuncionario = $1", [
    idfuncionario,
  ]);

  res
    .status(200)
    .send({ message: "Funcionario Excluido Com Sucesso!", idfuncionario });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const response = await db.query(
    "SELECT email, senha FROM funcionario WHERE email = $1 AND senha = $2",
    [email, senha]
  );
  if (!response.rows[0]) {
    res.status(401).send({ message: "Email ou Senha inválidos!" });
  } else {
    const token = generateAuthToken(email, senha);
    res.status(200).json({ token });
  }
};

const generateAuthToken = function (email, senha) {
  const token = jwt.sign({ email, senha }, process.env.JWT_PRIV_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });

  return token;
};

exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
