import dotenv from "dotenv";

dotenv.config();

/**
 * Required Environment Variables
 */
const requiredVariables = [
    "NODE_ENV",
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES_IN",
    "CLIENT_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
];

const missingVariables = requiredVariables.filter(
    (key) => !process.env[key]
);

if (missingVariables.length > 0) {

    throw new Error(
        `Missing environment variables: ${missingVariables.join(", ")}`
    );

}

const env = {

    app: {

        name: "AKSHU Technologies",

        env: process.env.NODE_ENV,

        port: Number(process.env.PORT),

        clientUrl: process.env.CLIENT_URL,

    },

    database: {

        uri: process.env.MONGODB_URI,

    },

    jwt: {

        secret: process.env.JWT_SECRET,

        expiresIn: process.env.JWT_EXPIRES_IN,

        refreshSecret:
            process.env.JWT_REFRESH_SECRET,

        refreshExpiresIn:
            process.env.JWT_REFRESH_EXPIRES_IN,

    },

    cloudinary: {

        cloudName:
            process.env.CLOUDINARY_CLOUD_NAME,

        apiKey:
            process.env.CLOUDINARY_API_KEY,

        apiSecret:
            process.env.CLOUDINARY_API_SECRET,

    },

    mail: {

    host: process.env.MAIL_HOST,

    port: Number(process.env.MAIL_PORT),

    user: process.env.MAIL_USER,

    password: process.env.MAIL_PASSWORD,

    from: process.env.MAIL_FROM,

    admin: process.env.ADMIN_EMAIL,

},

};



export default env;