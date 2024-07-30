export const namespaced = true;

export const state = () => ({
  user: null,
  token: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};

export const actions = {
  async register({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post('/auth/register', { username, password });
      commit('setUser', data.user);
      commit('setToken', data.token);
      this.$cookies.set('token', data.token);
    } catch (error) {
      console.error('An error occurred while registering:', error);
      throw error;
    }
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await this.$axios.post('/auth/login', { username, password });
      commit('setUser', data.user);
      commit('setToken', data.token);
      this.$cookies.set('token', data.token);
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      throw error;
    }
  },
  logout({ commit }) {
    commit('setUser', null);
    commit('setToken', null);
    this.$cookies.remove('token');
  },
};

export const getters = {
  isAuthenticated(state) {
    const token = state.token;
    return !!token;
  },
  getUser(state) {
    return state.user;
  },
};
