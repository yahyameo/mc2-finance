export const namespaced = true;

export const state = () => ({
  alerts: [],
  snackbar: {
    show: false,
    text: '',
  },
});

export const getters = {
  alerts: (state) => state.alerts,
  unexecutedAlertCount: (state) => state.alerts.filter(alert => !alert.executed).length,
};

export const mutations = {
  SET_ALERTS(state, alerts) {
    state.alerts = alerts;
  },
  ADD_ALERT(state, alert) {
    state.alerts.push(alert);
  },
  UPDATE_ALERT(state, updatedAlert) {
    const index = state.alerts.findIndex(alert => alert._id === updatedAlert._id);
    if (index !== -1) {
      state.alerts[index].executed = true;
      // Show snackbar when an alert is updated
      state.snackbar.show = true;
      state.snackbar.text = `Alert for ${updatedAlert.symbol} at ${updatedAlert.price} executed`;
    }
  },
  REMOVE_ALERT(state, alertId) {
    state.alerts = state.alerts.filter((alert) => alert._id !== alertId);
  },
  SET_SNACKBAR(state, { show, text }) {
    state.snackbar.show = show;
    state.snackbar.text = text;
  },
};

export const actions = {
  async fetchAlerts({ commit }) {
    try {
      const { data } = await this.$axios.get('/alerts');
      commit('SET_ALERTS', data);
    } catch (error) {
      console.error('Failed to fetch alerts', error);
    }
  },
  async createAlert({ commit }, alert) {
    try {
      const { data } = await this.$axios.post('/alerts', alert);
      commit('ADD_ALERT', data);
    } catch (error) {
      console.error('Failed to create alert', error);
    }
  },
  async deleteAlert({ commit }, alertId) {
    try {
      await this.$axios.delete(`/alerts/${alertId}`);
      commit('REMOVE_ALERT', alertId);
    } catch (error) {
      console.error('Failed to delete alert', error);
    }
  },
  updateAlert({ commit }, updatedAlert) {
    commit('UPDATE_ALERT', updatedAlert);
  },
  setSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar);
  },
};
