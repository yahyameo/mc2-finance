<template>
    <v-container>
      <v-row>
        <v-col>
          <transak-widget />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import TransakWidget from '~/components/TransakWidget.vue'
  
  export default {
    components: {
      TransakWidget,
    },
  }
  </script>
  
  