import nodemailer from "nodemailer";

// 🔹 Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Send email function
export const sendEmail = async ({ to, subject, body }) => {
  try {
    await transporter.sendMail({
      from: `"QuickShow 🎬" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: body,
    });

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};
