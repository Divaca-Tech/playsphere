const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerAnnotation = require("../utils/swagger.annotation")

module.exports = (app) => { 
    app.use((req, res, next) => {
        var localhost = true
        if(req.hostname != "127.0.0.1" && req.hostname != "localhost"){
            localhost = false
        }

        next()
        
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
                    url: localhost ? "http://127.0.0.1:3000/api/v1" : "https://playshere-api-v1.onrender.com/api/v1",
                    description: 'Development server',
                },
                ],
                paths: swaggerAnnotation,
                tags: [
                    { name: 'Auth', description: 'Endpoints related to user authentication' },
                    { name: 'Post', description: 'Endpoints related to Post' }
                ]
            },
            apis: ['index.js'],
        };
        
        const setup = swaggerJsdoc(options);

        app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(setup));
    })
};