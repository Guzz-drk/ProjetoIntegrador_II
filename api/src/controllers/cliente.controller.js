const db = require("../config/database");
// Método responsável por criar um novo Cliente, e validação de campo

exports.createCliente = async (req, res) => {
  const { nome, email, cpf, telefone } = req.body;
  const { rows } = await db.query(
    "INSERT INTO cliente (nome, email, cpf, telefone) VALUES ($1, $2, $3, $4)",
    [nome, email, cpf, telefone]
  );
  res.status(201).send({
    message: "Cliente adicionado com sucesso!",
    body: {
      cliente: {
        nome,
        email,
        cpf,
        telefone,
      },
    },
  });
};

exports.listAllCliente = async (req, res) => {
  const response = await db.query("SELECT * FROM cliente ORDER BY nome ASC");
  res.status(200).send(response.rows);
};

exports.findClienteById = async (req, res) => {
  const idcliente = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM cliente WHERE idcliente = $1",
    [idcliente]
  );
  res.status(200).send(response.rows);
};

exports.updateClienteById = async (req, res) => {
  const idcliente = parseInt(req.params.id);
  const { nome, email, cpf, telefone } = req.body;
  const response = await db.query(
    "UPDATE cliente SET nome = $1, email = $2, cpf = $3, telefone = $4 WHERE idcliente = $5",
    [nome, email, cpf, telefone, idcliente]
  );

  res.status(200).send({ message: "Cliente editado com sucesso!" });
};
exports.deleteClienteById = async (req, res) => {
  const idcliente = parseInt(req.params.id);
  await db.query("DELETE FROM cliente WHERE idcliente = $1", [idcliente]);

  res.status(200).send({ message: "Cliente deleado com sucesso!", idcliente });
};
