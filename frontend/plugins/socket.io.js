import io from 'socket.io-client';

export default ({ store }, inject) => {
    const token = store.state.auth.token;
    const socket = io('http://localhost:5000', {
        auth: {
            token
        },
        transports: ['websocket'], 
    });

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
    });

    // Listen for price alerts
    socket.on('priceAlert', (data) => {
        // Mark alert as executed
        store.dispatch('alerts/updateAlert', { ...data, executed: true });
    });

    inject('socket', socket);
};
