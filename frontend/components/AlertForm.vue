<template>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="symbol"
            label="Symbol (e.g BTC)"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="price"
            label="Price"
            type="number"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="direction"
            :items="['above', 'below']"
            label="Direction"
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-btn @click="createAlert" color="primary">Create Alert</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        symbol: '',
        price: '',
        direction: 'above',
      };
    },
    methods: {
      async createAlert() {
        if (this.symbol && this.price) {
          const alert = {
            symbol: this.symbol.toUpperCase(),
            price: parseFloat(this.price),
            direction: this.direction,
          };
          await this.$store.dispatch('alerts/createAlert', alert);
          this.symbol = '';
          this.price = '';
          this.direction = 'above';
        }
      },
    },
  };
  </script>
  