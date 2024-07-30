export const namespaced = true;

export const state = () => ({
  watchlist: [],
  prices: {},
  sockets: {},
});

export const mutations = {
  setWatchlist(state, watchlist) {
    state.watchlist = watchlist;
  },
  addSymbol(state, symbol) {
    state.watchlist.push(symbol);
  },
  removeSymbol(state, symbol) {
    state.watchlist = state.watchlist.filter(s => s !== symbol);
    if (state.sockets[symbol]) {
      state.sockets[symbol].close();
      delete state.sockets[symbol];
    }
    delete state.prices[symbol];
  },
  updatePrice(state, { symbol, price }) {
    state.prices = { ...state.prices, [symbol]: price };
  },
  setSocket(state, { symbol, socket }) {
    state.sockets = { ...state.sockets, [symbol]: socket };
  },
};

export const actions = {
  async fetchWatchlist({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/watchlist');
      commit('setWatchlist', data.symbols);

      if (process.client) {
        dispatch('initializeWebSockets', data.symbols);
      }
    } catch (error) {
      console.error('An error occurred while fetching the watchlist:', error);
    }
  },
  initializeWebSockets({ dispatch }, symbols) {
    symbols.forEach(symbol => {
      dispatch('subscribeToWebSocket', symbol);
    });
  },
  subscribeToWebSocket({ commit, dispatch }, symbol) {
    if (process.client) {
      const coin = `${symbol.toLowerCase()}usdt`;
      const socket = new WebSocket(`wss://fstream.binance.com/ws/${coin}@trade`);

      socket.onmessage = (event) => {
        const trade = JSON.parse(event.data);
        dispatch('handlePriceUpdate', { symbol, price: trade.p });
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      commit('setSocket', { symbol, socket });
    }
  },
  handlePriceUpdate({ commit }, { symbol, price }) {
    commit('updatePrice', { symbol, price });
  },
  async addToWatchlist({ commit, dispatch }, symbol) {
    try {
      await this.$axios.post('/watchlist', { symbol });
      commit('addSymbol', symbol);
      dispatch('subscribeToWebSocket', symbol);
    } catch (error) {
      console.error('An error occurred while adding to the watchlist:', error);
    }
  },
  async removeFromWatchlist({ commit }, symbol) {
    try {
      await this.$axios.delete('/watchlist', { data: { symbol } });
      commit('removeSymbol', symbol);
    } catch (error) {
      console.error('An error occurred while removing from the watchlist:', error);
    }
  },
};

export const getters = {
  watchlist(state) {
    return state.watchlist;
  },
  prices(state) {
    return state.prices;
  }
};
