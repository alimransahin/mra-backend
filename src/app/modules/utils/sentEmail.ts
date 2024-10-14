import nodemailer from "nodemailer";
import config from "../../config";
export const sentEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mdalimransahin@gmail.com",
      pass: "bhih xxhs lgne gyox",
    },
  });

  await transporter.sendMail({
    from: "mdalimransahin@gmail.com", // sender address
    to,
    subject: "Reset Password", // Subject line
    text: "reset your password within 10 minutes", // plain text body
    html,
  });
};
