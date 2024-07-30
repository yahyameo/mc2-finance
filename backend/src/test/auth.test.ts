import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from app.ts
import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI! as string);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Controller', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.status).toBe(201);
        const user = await User.findOne({ username: 'testuser' });
        expect(user).not.toBeNull();
    });

    it('if user already registered', async () => {
      const res = await request(app)
          .post('/api/auth/register')
          .send({ username: 'testuser', password: 'password123' });

      expect(res.status).toBe(400);
  });

    it('should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should not log in with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(res.status).toBe(401);
    });
});
