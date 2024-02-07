const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerAnnotation = require("../utils/swagger.annotation")

module.exports = (app) => {    
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
                url: true ? "http://127.0.0.1:3000/api/v1" : null,
                description: 'Development server',
            },
            ],
            paths: swaggerAnnotation,
        },
        apis: ['index.js'],
    };
    
    const setup = swaggerJsdoc(options);

    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(setup));
};