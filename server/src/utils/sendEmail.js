const nodemailer = require("nodemailer");

const sendEmail = async (visitData) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Property Visit Request",
    html: `
      <h2>New Visit Request</h2>

      <p><b>Name:</b> ${visitData.name}</p>
      <p><b>Phone:</b> ${visitData.phone}</p>
      <p><b>Date:</b> ${visitData.date}</p>
      <p><b>Time:</b> ${visitData.time}</p>

      <p>A customer scheduled a visit.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;