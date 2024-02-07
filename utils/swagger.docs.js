const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerAnnotation = require("../utils/swagger.annotation")

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'PlaySphere',
        version: '1.0.0',
        description: 'PlaySphere Documentation',
        },
        servers: [
        {
            url: 'http://127.0.0.1:3000/api/v1',
            description: 'Development server',
        },
        ],
        paths: swaggerAnnotation,
    },
    apis: ['index.js'],
};
  
const setup = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(setup));
};