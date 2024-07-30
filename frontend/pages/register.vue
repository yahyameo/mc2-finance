<template>
  <v-container 
    fluid 
    fill-height 
    class="d-flex align-center justify-center"
  >
    <v-card
      class="pa-4"
      max-width="400"
      outlined
    >
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="register">
        <v-text-field 
          v-model="username" 
          label="Username" 
          :rules="usernameRules"
          required
        ></v-text-field>

        <v-text-field 
          v-model="password" 
          label="Password" 
          type="password" 
          :rules="passwordRules"
          required
        ></v-text-field>

        <v-btn 
          type="submit" 
          color="primary"
          :disabled="!valid"
        >
          Register
        </v-btn>

        <v-alert 
          v-if="error" 
          type="error" 
          dismissible
        >
          {{ error }}
        </v-alert>
      </v-form>

      <v-divider class="my-4"></v-divider>

      <v-card-actions>
        <v-btn 
          text 
          to="/login"
        >
          Already have an account? Login here
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
      valid: false, // Track form validity
      error: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3) || 'Username must be at least 3 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
    };
  },
  methods: {
    async register() {
      // Validate form
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        await this.$store.dispatch('auth/register', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
        console.error('Registration failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-alert {
  margin-top: 20px;
}
</style>
