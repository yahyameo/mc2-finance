<template>
    <v-container>
      <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="newSymbol"
          label="Add a new symbol (e.g BTC)"
          @keyup.enter="addSymbol"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn @click="addSymbol" color="primary">
          Add
        </v-btn>
      </v-col>
    </v-row>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in watchlist" :key="item">
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
              <v-list-item-subtitle>$ {{ prices[item] || 'Loading...' }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeSymbol(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newSymbol: '',
      };
    },
    computed: {
      watchlist() {
        return this.$store.getters['watchlist/watchlist'];
      },
      prices() {
        return this.$store.getters['watchlist/prices'];
      }
    },
    methods: {
      addSymbol() {
        if (this.newSymbol) {
          this.$store.dispatch('watchlist/addToWatchlist', this.newSymbol.toUpperCase());
          this.newSymbol = '';
        }
      },
      removeSymbol(symbol) {
        this.$store.dispatch('watchlist/removeFromWatchlist', symbol);
      }
    },
    created() {
      if (process.client) {
        this.$store.dispatch('watchlist/fetchWatchlist');
      }
    },
    beforeDestroy() {
      const sockets = this.$store.state.watchlist.sockets;
      for (const symbol in sockets) {
        if (sockets[symbol]) {
          sockets[symbol].close();
        }
      }
    }
  }
  </script>
  