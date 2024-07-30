import Alert from '../models/Alert';
import { connectToBinanceWebSocket, updateBinanceWebSocket } from './binanceWebSocket';
import { Server } from 'socket.io';

const notifyUser = (_id: any, io: Server, userId: string, symbol: string, price: number) => {
    // Emit a 'priceAlert' event to the specific user
    console.log(`User ${userId} notified: ${symbol} price is ${price}`);
    io.to(userId).emit('priceAlert', { symbol, price, _id });
};

const checkPrice = async (io: Server, symbol: string, price: number) => {
    const alerts = await Alert.find({ symbol, executed: false });
    for (const alert of alerts) {
        if ((alert.direction === 'above' && price > alert.price) ||
            (alert.direction === 'below' && price < alert.price)) {
            alert.executed = true;
            await alert.save();
            notifyUser(alert._id, io, alert.user.toString(), symbol, price);
        }
    }
};

let symbols = new Set<string>();

export const startPriceChecker = async (io: Server) => {
    const initialSymbols = await Alert.distinct('symbol');
    symbols = new Set(initialSymbols);
    connectToBinanceWebSocket([...symbols], (symbol, price) => checkPrice(io, symbol, price));
};

export const addAlert = async (io: Server, symbol: string) => {
    if (!symbols.has(symbol)) {
        symbols.add(symbol);
        updateBinanceWebSocket([...symbols], (symbol, price) => checkPrice(io, symbol, price));
    }
};

export const removeAlert = async (io: Server, symbol: string) => {
    const remainingAlerts = await Alert.find({ symbol, executed: false });
    if (remainingAlerts.length === 0) {
        symbols.delete(symbol);
        updateBinanceWebSocket([...symbols], (symbol, price) => checkPrice(io, symbol, price));
    }
};
