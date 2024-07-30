import request from 'supertest';
import app from '../app';
import mongoose, { Types } from 'mongoose';
import Watchlist from '../models/Watchlist';
import { calculateTechnicalIndicator } from '../utils/calculateTechnicalIndicator';
import dotenv from 'dotenv';
dotenv.config();
jest.mock('../models/Watchlist');
jest.mock('../utils/calculateTechnicalIndicator');

describe('Watchlist Controller', () => {
    let userId: string;
    let token: string;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI! as string);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(() => {
        userId = "66a87448a619fbce4e2c4ade";
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4NzQ0OGE2MTlmYmNlNGUyYzRhZGUiLCJpYXQiOjE3MjIzMTY3NzN9.zvs5n3YMnL5WA5uxaiAtswGSxsEds4NwtHLfU-Z1FpQ'; // replace with actual token if needed
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a symbol to the watchlist', async () => {
        const symbol = 'BTCUSD';
        const technicalIndicatorMock = { indicator: 'mockIndicatorValue' };
        const mockWatchlist = { user: userId, symbols: [symbol], save: jest.fn() };

        (Watchlist.findOne as jest.Mock).mockResolvedValue(null);
        (Watchlist.prototype.save as jest.Mock).mockResolvedValue(mockWatchlist);
        (calculateTechnicalIndicator as jest.Mock).mockResolvedValue(technicalIndicatorMock);

        const res = await request(app)
            .post('/api/watchlist')
            .set('Authorization', `Bearer ${token}`)
            .send({ symbol });

        expect(res.status).toBe(200);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(Watchlist.prototype.save).toHaveBeenCalled();
        expect(calculateTechnicalIndicator).toHaveBeenCalledWith(symbol);
        expect(res.body.technicalIndicator).toEqual(technicalIndicatorMock);
    });

    it('should get the watchlist for the user', async () => {
        const mockWatchlist = { user: userId, symbols: ['BTCUSD'] };

        (Watchlist.findOne as jest.Mock).mockResolvedValue(mockWatchlist);

        const res = await request(app)
            .get('/api/watchlist')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(res.body).toEqual(mockWatchlist);
    });

    it('should return 404 if watchlist is not found', async () => {
        (Watchlist.findOne as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .get('/api/watchlist')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(res.text).toBe('Watchlist not found.');
    });

    it('should update an existing watchlist', async () => {
        const symbol = 'BTCUSD';
        const technicalIndicatorMock = { indicator: 'mockIndicatorValue' };
        const existingWatchlist = { user: userId, symbols: ['ETHUSD'], save: jest.fn() };

        (Watchlist.findOne as jest.Mock).mockResolvedValue(existingWatchlist);
        (calculateTechnicalIndicator as jest.Mock).mockResolvedValue(technicalIndicatorMock);

        const res = await request(app)
            .post('/api/watchlist')
            .set('Authorization', `Bearer ${token}`)
            .send({ symbol });

        expect(res.status).toBe(200);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(existingWatchlist.symbols).toContain(symbol);
        expect(existingWatchlist.save).toHaveBeenCalled();
        expect(calculateTechnicalIndicator).toHaveBeenCalledWith(symbol);
        expect(res.body.watchlist).toEqual(expect.objectContaining({ user: userId, symbols: ['ETHUSD', 'BTCUSD'] }));
        expect(res.body.technicalIndicator).toEqual(technicalIndicatorMock);
    });

    it('should remove a symbol from the watchlist', async () => {
        const symbol = 'BTCUSD';
        const mockWatchlist = { user: userId, symbols: ['BTCUSD', 'ETHUSD'], save: jest.fn() };

        (Watchlist.findOne as jest.Mock).mockResolvedValue(mockWatchlist);

        const res = await request(app)
            .delete('/api/watchlist')
            .set('Authorization', `Bearer ${token}`)
            .send({ symbol });

        expect(res.status).toBe(200);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(mockWatchlist.symbols).not.toContain(symbol);
        expect(mockWatchlist.save).toHaveBeenCalled();
        expect(res.body).toEqual(expect.objectContaining({ user: userId, symbols: ['ETHUSD'] }));
    });

    it('should return 404 if watchlist is not found when removing a symbol', async () => {
        const symbol = 'BTCUSD';

        (Watchlist.findOne as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .delete('/api/watchlist')
            .set('Authorization', `Bearer ${token}`)
            .send({ symbol });

        expect(res.status).toBe(404);
        expect(Watchlist.findOne).toHaveBeenCalledWith({ user: userId });
        expect(res.text).toBe('Watchlist not found.');
    });
});
