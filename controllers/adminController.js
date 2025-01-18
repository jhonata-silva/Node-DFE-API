const AdminService = require('../services/adminService');

exports.createAdmin = (req, res) => {
    const { nome, email, senha } = req.body;
    AdminService.createAdmin(nome, email, senha, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
            message: 'Administrador adicionado com sucesso!',
            data: admin
        });
    });
};

exports.getAllAdmins = (req, res) => {
    AdminService.getAllAdmins((err, admins) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
            message: 'Lista de administradores',
            data: admins
        });
    });
};

exports.getAdminById = (req, res) => {
    const { id } = req.params;
    AdminService.getAdminById(id, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
            message: 'Administrador encontrado',
            data: admin
        });
    });
};

exports.updateAdmin = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    AdminService.updateAdmin(id, nome, email, senha, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
            message: 'Administrador atualizado com sucesso!',
            data: admin
        });
    });
};

exports.deleteAdmin = (req, res) => {
    const { id } = req.params;
    AdminService.deleteAdmin(id, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({
            message: 'Administrador deletado com sucesso!',
            data: { id }
        });
    });
};
