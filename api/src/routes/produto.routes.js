const router = require("express-promise-router")();
const produtoController = require("../controllers/produto.controller");

// Rota responsável por adicionar um Produto na base de dados
router.post("/produto", produtoController.createProduto);

// Rota responsável por listar todos os Produtos
router.get("/produto", produtoController.listAllProduto);

// Rota responsável por exibir um Produto pelo id
router.get("/produto/:id", produtoController.findProdutoById);

// Rota responsável por atualizar um Produto pelo id
router.put("/produto/:id", produtoController.updateProdutoById);

// Rota responsável por excluir um Produto pelo id
router.delete("/produto/:id", produtoController.deleteProdutoById);

module.exports = router;
