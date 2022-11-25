const router = require("express-promise-router")();
const atendimentoProdutoController = require("../controllers/atendimentoProduto.controller");

// Rota responsável por adicionar Atendimento na base de dados
router.post(
  "/atendimentoProduto",
  atendimentoProdutoController.createAtendimentoProduto
);

// Rota responsável por listar todos os Atendimentos
router.get(
  "/atendimento/:id/atendimentoProduto",
  atendimentoProdutoController.listAllAtendimentoProduto
);

// Rota responsável por exibir um Atendimento pelo id
router.get(
  "/atendimentoProduto/:id",
  atendimentoProdutoController.findAtendimentoProdutoById
);

// Rota responsável por atualizar um Atendimento pelo id
router.put(
  "/atendimentoProduto/:id",
  atendimentoProdutoController.updateAtendimentoProdutoById
);

// Rota responsável por excluir um Atendimento pelo id
router.delete(
  "/atendimentoProduto/:id",
  atendimentoProdutoController.deleteAtendimentoProdutoById
);

module.exports = router;
