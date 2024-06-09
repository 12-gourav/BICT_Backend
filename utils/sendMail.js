import { createTransport } from "nodemailer";

export const sendMails = async (email, subject, text, html) => {
  // console.log(email);
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: "bashar.info.bic@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
    port: 465,
    host: "smtp.gmail.com",
    tls: { rejectUnauthorized: false },
  });

  await transport.sendMail({
    from:  "bashar.info.bic@gmail.com",
    to: email,
    subject,
    html: html,
  });


};

