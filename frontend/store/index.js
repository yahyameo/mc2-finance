import Vue from 'vue';
import Vuex from 'vuex';
import * as watchlist from './watchlist';
import * as auth from './auth';
import * as alerts from './alerts';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      watchlist,
      alerts
    },
    actions: {
      // Initialize Vuex store from cookies
      nuxtServerInit({ commit }, { app }) {
        const token = app.$cookies.get('token');
        if (token) {
          commit('auth/setToken', token);
          // Optionally, you can fetch the user details using the token
        }
      }
    }
  });
};

export default createStore;
