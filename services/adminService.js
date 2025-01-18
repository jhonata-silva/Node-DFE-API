const db = require('../db/database');
const Admin = require('../models/adminModel');

class AdminService {
    static createAdmin(nome, email, senha, callback) {
        const query = `INSERT INTO administradores (nome, email, senha) VALUES (?, ?, ?)`;
        db.run(query, [nome, email, senha], function(err) {
            if (err) return callback(err);
            callback(null, new Admin(this.lastID, nome, email, senha));
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
        const query = `UPDATE administradores SET nome = ?, email = ?, senha = ? WHERE id = ?`;
        db.run(query, [nome, email, senha, id], function(err) {
            if (err) return callback(err);
            callback(null, new Admin(id, nome, email, senha));
        });
    }

    static deleteAdmin(id, callback) {
        const query = `DELETE FROM administradores WHERE id = ?`;
        db.run(query, [id], function(err) {
            if (err) return callback(err);
            callback(null);
        });
    }
}

module.exports = AdminService;
