<template>
    <div>
      <AlertForm />
      <AlertList />
    </div>
  </template>
  
  <script>
  import AlertForm from '@/components/AlertForm.vue';
  import AlertList from '@/components/AlertList.vue';
  
  export default {
    middleware: 'auth-user',
    components: {
      AlertForm,
      AlertList,
    },
  };
  </script>
  