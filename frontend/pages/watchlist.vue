<template>
    <v-container>
      <v-row class="my-3">
        <v-col>
          <watchlist />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import Watchlist from '~/components/Watchlist.vue'
  
  export default {
    middleware: 'auth-user',
    components: {
      Watchlist,
    },
  }
  </script>
  
  