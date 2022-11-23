const router = require("express-promise-router")();
const atendimentoController = require("../controllers/atendimento.controller");

// Rota responsável por adicionar Atendimento na base de dados
router.post("/atendimento", atendimentoController.createAtendimento);

// Rota responsável por listar todos os Atendimentos
router.get("/atendimento", atendimentoController.listAllAtendimento);

router.get("/atendimento/hoje", atendimentoController.findAtendimentoHoje);

// Rota responsável por exibir um Atendimento pelo id
router.get("/atendimento/:id", atendimentoController.findAtendimentoById);

// Rota responsável por atualizar um Atendimento pelo id
router.put("/atendimento/:id", atendimentoController.updateAtendimentoById);

// Rota responsável por excluir um Atendimento pelo id
router.delete("/atendimento/:id", atendimentoController.deleteAtendimentoById);

module.exports = router;
