const ProductService = require('../services/productService');

exports.createProduct = (req, res) => {
    const { nome, preco, descricao, quantidade_estoque } = req.body;
    ProductService.createProduct(nome, preco, descricao, quantidade_estoque, (err, product) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(product);
    });
};

exports.getAllProducts = (req, res) => {
    ProductService.getAllProducts((err, products) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(products);
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    ProductService.getProductById(id, (err, product) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(product);
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { nome, preco, descricao, quantidade_estoque } = req.body;
    ProductService.updateProduct(id, nome, preco, descricao, quantidade_estoque, (err, product) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(product);
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    ProductService.deleteProduct(id, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id });
    });
};
