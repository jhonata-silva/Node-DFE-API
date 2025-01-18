const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Rota inicial da API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Exibe a mensagem inicial e link para a documentação
 *     tags: [Home]
 *     security: []
 *     responses:
 *       200:
 *         description: Mensagem inicial
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 documentation:
 *                   type: string
 *               example:
 *                 message: Home da API criada no desafio
 *                 documentation: http://localhost:3000/api-docs
 */
router.get('/', homeController.home);

module.exports = router;
