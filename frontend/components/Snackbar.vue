<template>
    <v-snackbar v-model="snackbar.show" :timeout="5000">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    computed: {
      snackbar() {
        return this.$store.state.alerts.snackbar;
      },
    },
  };
  </script>
  