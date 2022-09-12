const router = require("express-promise-router")();
const funcionarioController = require("../controllers/funcionario.controller");

// Rota responsável por adicionar um funcionario na base de dados
router.post("/funcionario", funcionarioController.createFuncionario);

// Rota responsável por listar todos os Funcionarios
router.get("/funcionario", funcionarioController.listAllFuncionario);

// Rota responsável por exibir um Funcionario pelo id
router.get("/funcionario/:id", funcionarioController.findFuncionarioById);

// Rota responsável por atualizar um Funcionario pelo id
router.put("/funcionario/:id", funcionarioController.updateFuncionarioById);

// Rota responsável por excluir um Funcionario pelo id
router.delete("/funcionario/:id", funcionarioController.deleteFuncionarioById);

module.exports = router;
