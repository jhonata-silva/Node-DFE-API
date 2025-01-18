const db = require('../db/database');
const Product = require('../models/productModel');

class ProductService {
    static createProduct(nome, preco, descricao, quantidade_estoque, callback) {
        const data_criacao = new Date().toISOString();
        const data_modificacao = data_criacao;
        const query = `INSERT INTO produtos (nome, preco, descricao, data_criacao, data_modificacao, quantidade_estoque) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(query, [nome, preco, descricao, data_criacao, data_modificacao, quantidade_estoque], function(err) {
            if (err) return callback(err);
            callback(null, new Product(this.lastID, nome, preco, descricao, data_criacao, data_modificacao, quantidade_estoque));
        });
    }

    static getAllProducts(callback) {
        const query = `SELECT * FROM produtos`;
        db.all(query, [], (err, rows) => {
            if (err) return callback(err);
            const products = rows.map(row => new Product(row.id, row.nome, row.preco, row.descricao, row.data_criacao, row.data_modificacao, row.quantidade_estoque));
            callback(null, products);
        });
    }

    static getProductById(id, callback) {
        const query = `SELECT * FROM produtos WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            if (err) return callback(err);
            if (!row) return callback(new Error('Produto não encontrado'));
            callback(null, new Product(row.id, row.nome, row.preco, row.descricao, row.data_criacao, row.data_modificacao, row.quantidade_estoque));
        });
    }

    static updateProduct(id, nome, preco, descricao, quantidade_estoque, callback) {
        const data_modificacao = new Date().toISOString();
        const query = `UPDATE produtos SET nome = ?, preco = ?, descricao = ?, data_modificacao = ?, quantidade_estoque = ? WHERE id = ?`;
        db.run(query, [nome, preco, descricao, data_modificacao, quantidade_estoque, id], function(err) {
            if (err) return callback(err);
            callback(null, new Product(id, nome, preco, descricao, data_modificacao, data_modificacao, quantidade_estoque));
        });
    }

    static deleteProduct(id, callback) {
        const query = `DELETE FROM produtos WHERE id = ?`;
        db.run(query, [id], function(err) {
            if (err) return callback(err);
            callback(null);
        });
    }
}

module.exports = ProductService;
