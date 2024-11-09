const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/criar', userController.create);
router.get('/selecionarTodos', userController.getAll);
router.put('/selecionarUmaPessoa/:id_pessoa', userController.getOne);
router.put('/atualizar/:id_pessoa', userController.update);
router.delete('/deletar/:id_pessoa', userController.delete);


module.exports = router;