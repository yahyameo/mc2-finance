<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedSymbol"
          :items="symbols"
          label="Select Cryptocurrency"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <trading-view-chart :symbol="selectedSymbol" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TradingViewChart from '~/components/TradingViewChart.vue'

export default {
  components: {
    TradingViewChart,
  },
  data() {
    return {
      selectedSymbol: 'BTCUSD',
      symbols: [
        { value: 'BTCUSD', text: 'Bitcoin' },
        { value: 'ETHUSD', text: 'Ethereum' },
        { value: 'LTCUSD', text: 'Litecoin' },
      ],
    }
  },
}
</script>

