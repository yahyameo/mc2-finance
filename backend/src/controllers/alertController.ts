import { Request, Response } from 'express';
import Alert from '../models/Alert';
import { addAlert, removeAlert } from '../utils/priceChecker';
import { Server } from 'socket.io';

export const createAlert = (io: Server) => async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { symbol, price, direction } = req.body;

        const alert = new Alert({ user: userId, symbol, price, direction });
        await alert.save();
        await addAlert(io, symbol);
    
        res.status(201).send(alert);
    } catch (error) {
        console.error('Error creating alert:', error);
        res.status(500).send({ message: 'Error creating alert' });
    }
};

export const getAlerts = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const alerts = await Alert.find({ user: userId });
        res.send(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).send({ message: 'Error fetching alerts' });
    }
};

export const deleteAlert = (io: Server) => async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { alertId } = req.params;

        const alert = await Alert.findOneAndDelete({ _id: alertId, user: userId });
        if (alert) {
            await removeAlert(io, alert.symbol);
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting alert:', error);
        res.status(500).send({ message: 'Error deleting alert' });
    }
};
