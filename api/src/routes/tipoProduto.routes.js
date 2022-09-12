const router = require("express-promise-router")();
const tipoProdutoController = require("../controllers/tipoProduto.controller");

// Rota responsável por adicionar um Tipo Produto na base de dados
router.post("/tipoProduto", tipoProdutoController.createTipoProduto);

// Rota responsável por listar todos os Tipos Produtos
router.get("/tipoProduto", tipoProdutoController.listAllTipoProduto);

// Rota responsável por exibir um Tipo Produto pelo id
router.get("/tipoProduto/:id", tipoProdutoController.findTipoProdutoById);

// Rota responsável por atualizar um Tipo Produto pelo id
router.put("/tipoProduto/:id", tipoProdutoController.updateTipoProdutoById);

// Rota responsável por excluir um Tipo Produto pelo id
router.delete("/tipoProduto/:id", tipoProdutoController.deleteTipoProdutoById);

module.exports = router;
