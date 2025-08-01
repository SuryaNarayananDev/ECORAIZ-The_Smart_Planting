import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

const setUserRoutes = (app) => {
    app.use('/api/users', router);

    router.post('/', userController.createUser);
    router.post('/login', userController.signIn);
    router.post('/send-otp', userController.sendOtp);
    router.post('/verify-otp', userController.verifyOtp);
    router.post('/reset-password', userController.resetPassword);

    router.get('/:id', userController.getUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);
};

export default setUserRoutes;
