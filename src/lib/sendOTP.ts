import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendOTP = async (email: string, otp: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER!,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  });
};
