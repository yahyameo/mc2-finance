import Vue from 'vue';

const EventBus = new Vue();

export default ({ app }, inject) => {
  // Inject the event bus into Vue components
  app.$eventBus = EventBus;
  inject('eventBus', EventBus);
};
