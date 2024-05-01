const service = require('../services/todoappServices')

const getAllLists = service.selectData;

const getOneList = service.selectOne;

const postList = service.postData;

const signUp = service.signUp;

const login = service.login;

const updateList = service.updateTask;

const deleteList = service.deleteTask;

module.exports = {
    getAllLists,
    getOneList,
    postList,
    signUp,
    login,
    updateList,
    deleteList
}