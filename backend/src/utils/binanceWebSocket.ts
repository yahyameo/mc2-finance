import WebSocket from 'ws';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

let ws: WebSocket | null = null;

export const connectToBinanceWebSocket = (symbols: string[], onPriceUpdate: (symbol: string, price: number) => void) => {
    ws = new WebSocket(BINANCE_WS_URL);

    ws.on('open', () => {
        console.log('Connected to Binance WebSocket');
        symbols.forEach(symbol => {
            ws!.send(JSON.stringify({
                method: 'SUBSCRIBE',
                params: [`${symbol.toLowerCase()}usdt@trade`],
                id: Date.now()
            }));
        });
    });

    ws.on('message', (data: any) => {
        const message = JSON.parse(data.toString());
        if (message.e === 'trade') {
            const symbol = message.s.toUpperCase();
            const price = parseFloat(message.p);
            onPriceUpdate(symbol.replace("USDT",""), price);
        }
    });

    ws.on('close', () => {
        console.log('Disconnected from Binance WebSocket');
        // Reconnect logic can be implemented here
    });

    return ws;
};

export const updateBinanceWebSocket = (symbols: string[], onPriceUpdate: (symbol: string, price: number) => void) => {
    if (ws) {
        ws.close();
    }
    connectToBinanceWebSocket(symbols, onPriceUpdate);
};
