const AdminService = require('../services/adminService');
const { generateToken } = require('../middlewares/auth');

exports.login = (req, res) => {
    const { email, senha } = req.body;
    AdminService.validateLogin(email, senha, (err, admin) => {
        if (err) return res.status(401).send('Login inválido!');
        const token = generateToken(admin.id);
        res.status(200).send({ auth: true, token });
    });
};
