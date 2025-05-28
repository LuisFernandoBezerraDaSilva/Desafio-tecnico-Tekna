const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

class AuthService extends BaseService {
  constructor() {
    const authSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    super(prisma.user, authSchema);
  }

  async findByUsername(username) {
    return await this.model.findUnique({ where: { username } });
  }

  generateAccessToken(user) {
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRATION || '15m';
    return jwt.sign({ id: user.id }, secretKey, { expiresIn });
  }

  async authenticate(username, password) {
    const user = await this.findByUsername(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);

    await this.model.update({
      where: { id: user.id },
      data: { token: accessToken },
    });

    return { accessToken, userId: user.id };
  }
}

module.exports = AuthService;