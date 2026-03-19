const nodemailer = require("nodemailer");

const sendContactEmail = async (contactData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Message:</strong> ${contactData.message}</p>
      <p><strong>Meeting Time:</strong> ${contactData.meetingTime}</p>
      <p>A customer has submitted the contact form.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendContactEmail;