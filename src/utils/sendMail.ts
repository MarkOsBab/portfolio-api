import nodemailer from "nodemailer";
import { logger } from "./logger.js";
import config from "./config.js";

const { mailEmail, mailPassword } = config;

export const sendMail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: mailEmail,
            pass: mailPassword,
        }
    });

    const mailOptions = {
        from: mailEmail,
        to,
        subject,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email sended. MessageID: ${info.messageId}, ${info.accepted}`);
    } catch (error: any) {
        logger.error(`An error ocurred try to send the email. Exception: ${error.message}`);
    }
}