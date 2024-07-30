export default function ({ $axios, store, app }) {
    $axios.onRequest(config => {
      const token = store.state.auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  
    $axios.onError((error) => {
      if (app && app.$eventBus) {
        if (error.response && error.response.status === 404) {
          app.$eventBus.$emit('show-error', '404 Error: The requested resource was not found.');
        } else {
          app.$eventBus.$emit('show-error', `An error occurred: ${error.message}`);
        }
      } else {
        console.error('Event bus is not defined');
      }
    });
  }
  