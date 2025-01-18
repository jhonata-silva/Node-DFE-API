
exports.home = (req, res) => {
    res.json({
        message: 'Home da API criada no desafio',
        documentation: `http://localhost:${process.env.PORT || 3000}/api-docs`
    });
};
