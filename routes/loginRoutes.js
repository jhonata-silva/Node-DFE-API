const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operações de autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login e gera um token JWT
 *     tags: [Login]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             example:
 *               email: admin@exemplo.com
 *               senha: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Login inválido
 */
router.post('/login', loginController.login);

module.exports = router;
