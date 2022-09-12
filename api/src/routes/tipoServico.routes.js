const router = require("express-promise-router")();
const tipoServicoController = require("../controllers/tipoServico.controller");

// Rota responsável por adicionar um Tipo Servico na base de dados
router.post("/tipoServico", tipoServicoController.createTipoServico);

// Rota responsável por listar todos os Tipos Servicos
router.get("/tipoServico", tipoServicoController.listAllTipoServico);

// Rota responsável por exibir um Tipo Servico pelo id
router.get("/tipoServico/:id", tipoServicoController.findTipoServicoById);

// Rota responsável por atualizar um Tipo Servico pelo id
router.put("/tipoServico/:id", tipoServicoController.updateTipoServicoById);

// Rota responsável por excluir um Tipo Servico pelo id
router.delete("/tipoServico/:id", tipoServicoController.deleteTipoServicoById);

module.exports = router;
