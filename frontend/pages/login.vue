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
          <span class="headline">Login</span>
        </v-card-title>
  
        <v-form ref="form" v-model="valid" @submit.prevent="login">
          <v-text-field
            ref="username"
            v-model="username"
            label="Username"
            :rules="usernameRules"
            required
            :error-messages="errors.username"
          ></v-text-field>
  
          <v-text-field
            ref="password"
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
            :error-messages="errors.password"
          ></v-text-field>
  
          <v-btn
            type="submit"
            color="primary"
          >
            Login
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
            to="/register"
          >
            Don't have an account? Register here
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
        valid: false,  // Track form validity
        error: '',
        errors: {
          username: [],
          password: [],
        },
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
      async login() {
        this.error = '';
        this.errors = { username: [], password: [] };
  
        // Validate form
        if (!this.$refs.form.validate()) {
          return;
        }
  
        try {
          // Attempt login
          await this.$store.dispatch('auth/login', {
            username: this.username,
            password: this.password,
          });
  
          // Redirect on successful login
          this.$router.push('/');
        } catch (error) {
          // Handle validation or server errors
          if (error.response && error.response.status === 400) {
            this.error = 'Invalid username or password.';
          } else {
            this.error = 'An unexpected error occurred. Please try again.';
          }
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
  