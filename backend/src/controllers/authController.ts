import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (user) return res.status(400).send('User already registered.');

  user = new User({ username, password: await bcrypt.hash(password, 10) });
  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
  res.status(201).send({ _id: user._id, username: user.username, token: token });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid username or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid username or password.');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
  res.header('Authorization', token).send({ _id: user._id, username: user.username, token: token });
};
