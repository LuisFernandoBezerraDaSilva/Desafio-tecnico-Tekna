const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/tasks', authenticateToken, taskController.getAll);
router.post('/tasks', authenticateToken, taskController.create);
router.put('/tasks/:id', authenticateToken, taskController.update);
router.delete('/tasks/:id', authenticateToken, taskController.delete);

module.exports = router;