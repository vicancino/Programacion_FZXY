const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "FZ_XYZ", version: "1.0.0"},
    },
    apis: ["src/routes/router.auth.ts", "src/routes/router.asist.ts"],
};

// Docs en JSON format

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    console.log("proceso de documentacion iniciado");
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
});

    console.log('Version 1 Docs are available at http://localhost:4000/api/v1/docs');
};

export default swaggerDocs