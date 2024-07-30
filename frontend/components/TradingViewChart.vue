<template>
    <div id="tradingview-widget-container">
      <div id="tradingview_chart"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['symbol'],
    watch: {
      symbol: 'renderChart',
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart() {
        new TradingView.widget({
          container_id: "tradingview_chart",
          symbol: this.symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          studies: ['MASimple@tv-basicstudies'],
        });
      }
    }
  }
  </script>
  
  <style scoped>
  #tradingview-widget-container {
    height: 400px;
  }
  </style>
  