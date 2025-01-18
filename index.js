const express = require('express');
const { swaggerUi, specs } = require('./swagger');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rota inicial (home)
app.get('/', (req, res) => {
    res.json({
        message: 'Home da API criada no desafio',
        documentation: `http://localhost:${port}/api-docs`
    });
});

// Usar as rotas
app.use(adminRoutes);
app.use(productRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechar o banco de dados ao encerrar o servidor
process.on('SIGINT', () => {
    const db = require('./db/database');
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados SQLite:', err.message);
        } else {
            console.log('Banco de dados SQLite fechado.');
        }
        process.exit(0);
    });
});
