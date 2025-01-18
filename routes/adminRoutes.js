const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Gerenciamento de administradores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Administrador:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do administrador
 *         nome:
 *           type: string
 *           description: Nome do administrador
 *         email:
 *           type: string
 *           description: Email do administrador
 *         senha:
 *           type: string
 *           description: Senha do administrador
 *       example:
 *         id: 1
 *         nome: João Silva
 *         email: joao@exemplo.com
 *         senha: senha123
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrador'
 *     responses:
 *       200:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Erro na criação do administrador
 */
router.post('/admin', adminController.createAdmin);

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Retorna a lista de todos os administradores
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Erro ao buscar os administradores
 */
router.get('/admins', adminController.getAllAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Retorna um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Erro ao buscar o administrador
 */
router.get('/admin/:id', adminController.getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Atualiza um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Administrador'
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Erro na atualização do administrador
 */
router.put('/admin/:id', adminController.updateAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Deleta um administrador pelo ID
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Administrador'
 *       400:
 *         description: Erro ao deletar o administrador
 */
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;
