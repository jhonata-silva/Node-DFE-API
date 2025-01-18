const db = require('../db/database');
const Admin = require('../models/adminModel');
const { hashPassword, verifyPassword } = require('../middlewares/auth');

class AdminService {
    static createAdmin(nome, email, senha, callback) {
        const hashedPassword = hashPassword(senha);
        const query = `INSERT INTO administradores (nome, email, senha) VALUES (?, ?, ?)`;
        db.run(query, [nome, email, hashedPassword], function(err) {
            if (err) return callback(err);
            callback(null, new Admin(this.lastID, nome, email, hashedPassword));
        });
    }

    static getAllAdmins(callback) {
        const query = `SELECT * FROM administradores`;
        db.all(query, [], (err, rows) => {
            if (err) return callback(err);
            const admins = rows.map(row => new Admin(row.id, row.nome, row.email, row.senha));
            callback(null, admins);
        });
    }

    static getAdminById(id, callback) {
        const query = `SELECT * FROM administradores WHERE id = ?`;
        db.get(query, [id], (err, row) => {
            if (err) return callback(err);
            if (!row) return callback(new Error('Administrador não encontrado'));
            callback(null, new Admin(row.id, row.nome, row.email, row.senha));
        });
    }

    static updateAdmin(id, nome, email, senha, callback) {
        const hashedPassword = hashPassword(senha);
        const query = `UPDATE administradores SET nome = ?, email = ?, senha = ? WHERE id = ?`;
        db.run(query, [nome, email, hashedPassword, id], function(err) {
            if (err) return callback(err);
            callback(null, new Admin(id, nome, email, hashedPassword));
        });
    }

    static deleteAdmin(id, callback) {
        const query = `DELETE FROM administradores WHERE id = ?`;
        db.run(query, [id], function(err) {
            if (err) return callback(err);
            callback(null);
        });
    }

    static validateLogin(email, senha, callback) {
        const query = `SELECT * FROM administradores WHERE email = ?`;
        db.get(query, [email], (err, row) => {
            if (err) return callback(err);
            if (!row) return callback(new Error('Administrador não encontrado'));
            const isPasswordValid = verifyPassword(senha, row.senha);
            if (!isPasswordValid) return callback(new Error('Senha inválida'));
            callback(null, new Admin(row.id, row.nome, row.email, row.senha));
        });
    }
}

module.exports = AdminService;
