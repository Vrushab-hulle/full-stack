import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent Succesfully", response);
  } catch (error) {
    console.log(`Error Sending Email : ${error.message}`);
    throw new Error(error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `Welcome ${username}`,
      html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username).replace(
        "{email}",
        email
      ),
      category: "Welcome on Board",
    });
    console.log("Email sent Succesfully", response);
  } catch (error) {
    console.log(`Error Sending Email : ${error.message}`);
    throw new Error(error);
  }
};

export const sendPasswordResetEmail = async (email, url) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetUrl}", url),
      category: "Reset Password",
    });
    console.log("Email sent Succesfully", response);
  } catch (error) {
    console.log(`Error Sending Email : ${error.message}`);
    throw new Error(error);
  }
};

export const sendResetSuccesEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password email",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Email sent Succesfully", response);
  } catch (error) {
    console.log(`Error Sending Email : ${error.message}`);
    throw new Error(error);
  }
};
