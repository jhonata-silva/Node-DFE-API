const AdminService = require('../services/adminService');

exports.createAdmin = (req, res) => {
    const { nome, email, senha } = req.body;
    AdminService.createAdmin(nome, email, senha, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(admin);
    });
};

exports.getAllAdmins = (req, res) => {
    AdminService.getAllAdmins((err, admins) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(admins);
    });
};

exports.getAdminById = (req, res) => {
    const { id } = req.params;
    AdminService.getAdminById(id, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(admin);
    });
};

exports.updateAdmin = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    AdminService.updateAdmin(id, nome, email, senha, (err, admin) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(admin);
    });
};

exports.deleteAdmin = (req, res) => {
    const { id } = req.params;
    AdminService.deleteAdmin(id, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id });
    });
};
