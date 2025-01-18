const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'seu_segredo_super_secreto'; // Você pode armazenar isso em uma variável de ambiente

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send({ auth: false, message: 'Nenhum token fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Função para gerar um token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secret, { expiresIn: '1d' });
};

// Função para hash de senha
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
};

// Função para verificar senha
const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    verifyToken,
    generateToken,
    hashPassword,
    verifyPassword,
};
