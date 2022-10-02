const db = require("../config/database");
// Método responsável por criar um novo Cliente, e validação de campo

exports.createCliente = async (req, res) => {
    const { nome, telefone, cpf, email } = req.body;
    const { rows } = await db.query(
      "INSERT INTO cliente (nome, telefone, cpf, email) VALUES ($1, $2, $3, $4)",
      [nome, telefone, cpf, email]
    );

    res.status(201).send({
      message: "Cliente Adicionado Com Sucesso!",
      body: {
        cliente: { nome, telefone, cpf, email },
      },
    });
};

// Método responsável por listar todos os Clientes
exports.listAllCliente = async (req, res) => {
  const response = await db.query("SELECT * FROM cliente ORDER BY nome ASC");
  res.status(200).send(response.rows);
};

// Método responsável por exibir um cliente pelo id
exports.findClienteById = async (req, res) => {
  const clienteId = parseInt(req.params.id);
  const response = await db.query(
    "SELECT * FROM cliente WHERE idCliente = $1",
    [clienteId]
  );
  res.status(200).send(response.rows);
};

// Método responsável por atualizar um cliente pelo id
exports.updateClienteById = async (req, res) => {
    const clienteId = parseInt(req.params.id);
    const { nome, telefone, cpf, email } = req.body;

    const response = await db.query(
      "UPDATE cliente SET nome = $1, telefone = $2, cpf = $3, email = $4 WHERE idCliente = $5",
      [nome, telefone, cpf, email, clienteId]
    );

    res.status(200).send({ message: "Cliente Atualizado Com Sucesso!" });
};

// Método responsável por excluir um cliente pelo id
exports.deleteClienteById = async (req, res) => {
  const clienteId = parseInt(req.params.id);
  await db.query("DELETE FROM cliente WHERE idCliente = $1", [clienteId]);

  res.status(200).send({ message: "Cliente Excluido Com Sucesso!", clienteId });
};
