/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer, { type Transporter } from "nodemailer";

// Ensure environment variables are properly typed and defaulted
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("User Email and Pasword is not present");
}

const transporter: Transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

interface SendEmailResult {
  messageId: string;
  // You can add more fields from the result if needed
}

const sendingEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<SendEmailResult> => {
  const mailOptions = {
    from: `Roc8 Project <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      messageId: result.messageId,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to send email: " + error.message);
    } else {
      throw new Error("Failed to send email due to unexpected error");
    }
  }
};

export default sendingEmail;
