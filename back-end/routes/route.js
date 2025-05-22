const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('That is a protected route');
});



module.exports = router;