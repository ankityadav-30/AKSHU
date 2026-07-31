import nodemailer from "nodemailer";
import env from "./env.js";

const transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: false,
    auth: {
        user: env.mail.user,
        pass: env.mail.password,
    },
});

export default transporter;