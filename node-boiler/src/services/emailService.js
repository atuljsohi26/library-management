import * as dotenv from "dotenv";

import EmailSender from "../utils/email_sender.js";
import { replaceEmailTemplateData, getFileAsString } from "../utils/helper.js";

dotenv.config();
const tamplatebaseUrl = process.env.EMAIL_BASE_TEMPLATE_URL;

export const sendEmail = async (template, data) => {
  console.log("here in email service");
  const emailSender = new EmailSender();

  try {
    console.log("inside try block");
    let emailTemplate = await getFileAsString(tamplatebaseUrl);
    if (emailTemplate == "null") return;
    let htmlBodyContent = await replaceEmailTemplateData(
      template.content,
      data
    );
    //console.log("htmlBodyContent**",htmlBodyContent);
    emailTemplate = emailTemplate.replace(/{{bodyContent}}/g, htmlBodyContent);

    //console.log("emailTemplate**",emailTemplate);
    await emailSender.sendEmail(data.to, template.subject, emailTemplate, data?.cc || '');
    console.log("after email send");
  } catch (err) {
    console.error("sendMailCatchError ***", err);
  }
};

