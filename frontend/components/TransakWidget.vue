<template>
    <div>
      <h3>Buy Cryptocurrency</h3>
      <iframe
        :src="transakUrl"
        frameborder="0"
        width="100%"
        height="600px"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      transakUrl() {
        const apiKey = 'bb7377b5-68b3-4f03-98be-abaa54729047';
        return `https://global-stg.transak.com?apiKey=${apiKey}&cryptoCurrencyCode=BTC&fiatCurrencyCode=USD`;
      }
    }
  }
  </script>
  