import transporter from "../config/mail.js";
import env from "../config/env.js";
import logger from "../utils/logger.js";
import ApiError from "../utils/ApiError.js";

class MailService {

    /**
     * Generic Email Sender
     */
    async sendEmail({
        to,
        subject,
        html,
        text = "",
    }) {

        try {

            const info =
                await transporter.sendMail({

                    from: env.mail.from,

                    to,

                    subject,

                    text,

                    html,

                });

            logger.info("Email sent successfully.", {

                messageId: info.messageId,

                recipient: to,

                subject,

            });

            return info;

        } catch (error) {

            logger.error("Email sending failed.", {

                recipient: to,

                subject,

                error: error.message,

            });

            throw new ApiError(
                500,
                "Unable to send email."
            );

        }

    }

    /**
     * Welcome Email
     */
    async sendWelcomeEmail(user) {

        return this.sendEmail({

            to: user.email,

            subject: "Welcome to AKSHU Technologies",

            html: `
                <h2>Hello ${user.firstName},</h2>

                <p>
                    Welcome to AKSHU Technologies.
                    We're happy to have you onboard.
                </p>
            `,

        });

    }

    /**
     * Verification Email
     */
    async sendVerificationEmail(
        email,
        verificationUrl
    ) {

        return this.sendEmail({

            to: email,

            subject: "Verify Your Email",

            html: `
                <h2>Email Verification</h2>

                <p>
                    Click the link below to verify your account.
                </p>

                <a href="${verificationUrl}">
                    Verify Email
                </a>
            `,

        });

    }

    /**
     * Password Reset Email
     */
    async sendPasswordResetEmail(
        email,
        resetUrl
    ) {

        return this.sendEmail({

            to: email,

            subject: "Reset Password",

            html: `
                <h2>Password Reset</h2>

                <p>
                    Click below to reset your password.
                </p>

                <a href="${resetUrl}">
                    Reset Password
                </a>
            `,

        });

    }

    /**
     * Contact Acknowledgement
     */
    async sendContactAcknowledgement(
        contact
    ) {

        return this.sendEmail({

            to: contact.email,

            subject: "We've received your inquiry",

            html: `
                <h2>Hello ${contact.name},</h2>

                <p>
                    Thank you for contacting
                    AKSHU Technologies.

                    Our team will respond soon.
                </p>
            `,

        });

    }

    /**
     * Notify Admin
     */
    async notifyAdminNewContact(
        contact
    ) {

        return this.sendEmail({

            to: env.mail.admin,

            subject: "New Contact Inquiry",

            html: `
                <h2>New Contact Received</h2>

                <p>Name : ${contact.name}</p>

                <p>Email : ${contact.email}</p>

                <p>Subject : ${contact.subject}</p>
            `,

        });

    }

    /**
     * Newsletter
     */
    async sendNewsletter(
        email,
        subject,
        html
    ) {

        return this.sendEmail({

            to: email,

            subject,

            html,

        });

    }

}

export default new MailService();