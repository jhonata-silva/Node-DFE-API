const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentação',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos de definição da API
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
