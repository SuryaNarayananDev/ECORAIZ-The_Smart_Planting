const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

const setUserRoutes = () => {
    const userController = new UserController();
    
    router.post('/', userController.createUser);
    router.get('/:id', userController.getUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);
    
    return router;
};

module.exports = setUserRoutes;