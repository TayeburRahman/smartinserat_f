const nodemailer = require("nodemailer");
const config = require("../config");

const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const sendEmail = async (options) => {
  console.log("=======config.smtp.smtp_host,===========", config.smtp.smtp_host, config.smtp.smtp_port, config.smtp.smtp_mail,  config.smtp.smtp_password)

  const transporter = nodemailer.createTransport({
    host: config.smtp.smtp_host,
    port: parseInt(config.smtp.smtp_port),
    secure: true,
    auth: {
      user: config.smtp.smtp_mail,
      pass: config.smtp.smtp_password,
    },
   
  });

  const { email, subject, html } = options;

  console.log("==================",email, subject)

  const mailOptions = {
    from: `${config.smtp.NAME} <${config.smtp.smtp_mail}>`,
    to: email,
    date: formattedDate,
    signed_by: "smartinserat.net",
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendEmail};
