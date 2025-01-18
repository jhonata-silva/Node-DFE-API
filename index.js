const express = require('express');
const cors = require('cors'); // Importar o middleware cors
const { swaggerUi, specs } = require('./swagger');
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const { verifyToken } = require('./middlewares/auth');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware para liberar o CORS para todas as origens
app.use(cors());

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas de home e login (não protegidas)
app.use('/', homeRoutes);
app.use('/', loginRoutes);

// Aplicar o middleware de autenticação para todas as rotas protegidas
app.use(verifyToken);

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
