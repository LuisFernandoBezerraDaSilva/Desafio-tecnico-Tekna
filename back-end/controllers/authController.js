const BaseController = require('./baseController');
const AuthService = require('../services/authService');

class AuthController extends BaseController {
  constructor(service) {
    super(service);
  }

  async register(req, res) {
    try {
      const user = await this.service.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const { token, userId } = await this.service.authenticate(username, password);
      res.status(200).json({ token, userId });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

const authService = new AuthService();
module.exports = new AuthController(authService);