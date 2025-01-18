const sqlite3 = require('sqlite3').verbose();
const { hashPassword } = require('./middlewares/auth'); // Assumindo que auth.js está no diretório middlewares

const dbPath = './db/database.sqlite'; // Caminho para o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Função para limpar a tabela de administradores
const clearAdminsTable = () => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM administradores`;
        db.run(query, (err) => {
            if (err) {
                return reject(err);
            }
            console.log('Tabela de administradores limpa.');
            resolve();
        });
    });
};

// Função para criar um novo administrador
const createAdmin = (nome, email, senha) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = hashPassword(senha);
        const query = `INSERT INTO administradores (nome, email, senha) VALUES (?, ?, ?)`;
        db.run(query, [nome, email, hashedPassword], function(err) {
            if (err) {
                return reject(err);
            }
            console.log(`Novo administrador criado: ${nome}`);
            resolve();
        });
    });
};

// Executar as funções sequencialmente
const resetDatabase = async () => {
    try {
        await clearAdminsTable();
        await createAdmin('Danilo', 'danilo@teste.com', '123456');
    } catch (err) {
        console.error('Erro ao resetar a base de dados:', err.message);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados SQLite:', err.message);
            } else {
                console.log('Banco de dados SQLite fechado.');
            }
        });
    }
};

resetDatabase();
