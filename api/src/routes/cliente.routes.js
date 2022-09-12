const router = require("express-promise-router")();
const clienteController = require("../controllers/cliente.controller");

// Rota responsável por adicionar cliente na base de dados
router.post("/cliente", clienteController.createCliente);

// Rota responsável por listar todos os clientes
router.get("/cliente", clienteController.listAllCliente);

// Rota responsável por exibir um cliente pelo id
router.get("/cliente/:id", clienteController.findClienteById);

// Rota responsável por atualizar um cliente pelo id
router.put("/cliente/:id", clienteController.updateClienteById);

// Rota responsável por excluir um cliente pelo id
router.delete("/cliente/:id", clienteController.deleteClienteById);

module.exports = router;
