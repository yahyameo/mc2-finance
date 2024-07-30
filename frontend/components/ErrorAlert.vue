<template>
    <v-alert v-if="errorMessage" type="error" dismissible @click="clearError">
      {{ errorMessage }}
    </v-alert>
  </template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: null
      };
    },
    created() {
      // Listen to the 'show-error' event
      this.$eventBus.$on('show-error', this.handleError);
    },
    beforeDestroy() {
      // Clean up the event listener
      this.$eventBus.$off('show-error', this.handleError);
    },
    methods: {
      handleError(message) {
        this.errorMessage = message;
      },
      clearError() {
        this.errorMessage = null;
      }
    }
  }
  </script>
  