import { Request, Response } from 'express';
import User from '../models/user.models.js';
import { sendOTP } from '../lib/sendOTP.js';


export const checkUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user && user.verified) {
    return res.json({ status: 'exists', message: 'User verified' });
  }

  return res.json({ status: 'not_exists', message: 'New user or not verified' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  user.otp = otp;
  await user.save();

  await sendOTP(email, otp);
  res.json({ message: 'OTP sent to email' });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (user && user.otp === otp) {
    user.verified = true;
    user.otp = undefined;
    await user.save();
    return res.json({ message: 'OTP verified' });
  }

  return res.status(400).json({ message: 'Invalid OTP' });
};
