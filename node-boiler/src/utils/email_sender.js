import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { replaceEmailTemplateData, getFileAsString } from "../utils/helper.js";
const tamplatebaseUrl = process.env.EMAIL_BASE_TEMPLATE_URL;

/**
 * Sends an email using Nodemailer
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text email content
 * @param {string} html - HTML email content
 */
export const sendEmail = async (template, data) => {
  console.log("template mail**",template);
    
  try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // Replace with your SMTP server
            port: Number(process.env.EMAIL_PORT), // SMTP port
            secure: false, // Use TLS
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
            tls: {
              rejectUnauthorized: false,
            },
            logger: true, // Enables detailed logging
            debug: true,
        });
        let emailTemplate = await getFileAsString(tamplatebaseUrl);
        if (emailTemplate == "null") return;
        let htmlBodyContent = await replaceEmailTemplateData(
          template.content,
          data
        );
        //console.log("htmlBodyContent**",htmlBodyContent);
        emailTemplate = emailTemplate.replace(/{{bodyContent}}/g, htmlBodyContent);
        // await emailSender.sendEmail(data.to, template.subject, emailTemplate, data?.cc || '');
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_FROM, // Sender address
            to:data.to,
            subject:template.subject,
            html:emailTemplate,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
