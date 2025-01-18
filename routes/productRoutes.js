const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - quantidade_estoque
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         data_criacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação do produto
 *         data_modificacao:
 *           type: string
 *           format: date-time
 *           description: Data de modificação do produto
 *         quantidade_estoque:
 *           type: integer
 *           description: Quantidade em estoque do produto
 *       example:
 *         id: 1
 *         nome: Produto 1
 *         preco: 29.99
 *         descricao: Descrição do Produto 1
 *         data_criacao: 2023-07-11T00:00:00Z
 *         data_modificacao: 2023-07-11T00:00:00Z
 *         quantidade_estoque: 100
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro na criação do produto
 */
router.post('/produto', productController.createProduct);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao buscar os produtos
 */
router.get('/produtos', productController.getAllProducts);

/**
 * @swagger
 * /produto/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao buscar o produto
 */
router.get('/produto/:id', productController.getProductById);

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro na atualização do produto
 */
router.put('/produto/:id', productController.updateProduct);

/**
 * @swagger
 * /produto/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Erro ao deletar o produto
 */
router.delete('/produto/:id', productController.deleteProduct);

module.exports = router;
