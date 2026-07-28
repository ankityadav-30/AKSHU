import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {

    definition: {

        openapi: "3.0.3",

        info: {

            title: "AKSHU Technologies API",

            version: "1.0.0",

            description:
                "Official REST API documentation for AKSHU Technologies.",

            contact: {

                name: "AKSHU Technologies",

                email: "support@akshu.tech",

            },

        },

        servers: [

            {
                url: "http://localhost:5000/api/v1",

                description: "Development Server",

            },

        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT",

                },

            },

        },

        security: [

            {

                bearerAuth: [],

            },

        ],

    },

    apis: [

        "./apps/server/routes/*.js",

        "./apps/server/controllers/*.js",

    ],

};

const swaggerSpec =
    swaggerJsDoc(options);

export {

    swaggerUi,

    swaggerSpec,

};