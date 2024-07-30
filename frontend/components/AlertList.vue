<template>
    <v-container>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="alert in alerts" :key="alert._id">
            <v-list-item-content>
              <v-list-item-title>{{ alert.symbol }}  
                <v-badge v-if="!alert.executed" color="red" content="New" />
                <v-badge v-if="alert.executed" color="success" content="Executed" />
            </v-list-item-title>
              <v-list-item-subtitle>
                Price: ${{ alert.price }} - Direction: {{ alert.direction }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeAlert(alert._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-badge color="primary" content="Unexecuted Alerts" :value="unexecutedAlertCount" />
    </v-container>
</template>

<script>
export default {
  computed: {
    alerts() {
      return this.$store.getters['alerts/alerts'];
    },
    unexecutedAlertCount() {
      return this.$store.getters['alerts/unexecutedAlertCount'];
    },
  },
  methods: {
    async removeAlert(alertId) {
      await this.$store.dispatch('alerts/deleteAlert', alertId);
    },
  },
  created() {
    this.$store.dispatch('alerts/fetchAlerts');
  },
};
</script>
