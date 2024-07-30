export default ({ app }, inject) => {
    const createSocket = (coin) => {
      const socket = new WebSocket(`wss://fstream.binance.com/ws/${coin}@trade`);
  
      socket.onmessage = (event) => {
        const trade = JSON.parse(event.data);
        app.$eventBus.$emit('price-update', trade);
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      return socket;
    };
  
    inject('createSocket', createSocket);
  };
  