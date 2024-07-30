export default ({ app }, inject) => {
    inject('cookies', app.$cookies);
  };
  