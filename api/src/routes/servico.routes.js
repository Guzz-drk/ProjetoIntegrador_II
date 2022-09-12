const router = require("express-promise-router")();
const servicoController = require("../controllers/servico.controller");

// Rota responsável por adicionar um Servico na base de dados
router.post("/servico", servicoController.createServico);

// Rota responsável por listar todos os Servicos
router.get("/servico", servicoController.listAllServico);

// Rota responsável por exibir um Servico pelo id
router.get("/servico/:id", servicoController.findServicoById);

// Rota responsável por atualizar um Servico pelo id
router.put("/servico/:id", servicoController.updateServicoById);

// Rota responsável por excluir um Servico pelo id
router.delete("/servico/:id", servicoController.deleteServicoById);

module.exports = router;
