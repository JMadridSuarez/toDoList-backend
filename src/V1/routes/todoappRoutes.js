const Router = require('express');
const router = Router();
const todoappController = require('../../controllers/todoappController');

router
    .get('/lists',todoappController.getAllLists)
    .get(`/lists/:userEmail`,todoappController.getOneList)
    .post('/lists',todoappController.postList)
    .post('/signup',todoappController.signUp )
    .post('/login',todoappController.login)
    .put('/lists/:id',todoappController.updateList)
    .delete('/lists/:id',todoappController.deleteList)

module.exports = router