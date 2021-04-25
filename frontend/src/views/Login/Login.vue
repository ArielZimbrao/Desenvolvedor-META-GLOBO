<template>
  <div class="login-background">
    <div class="login-container">
      <div class="logo-container">
        <img class="logo" :src="logo" />
      </div>
      <div class="title-container">
        <span class="title">Globo Analytics</span>
      </div>
      <div class="form-container">
        <Input 
          type="email"
          name="email" 
          label="Email" 
          :value="email" 
          v-model="email"
          :required="true"
        />
        <Input 
          type="password"
          name="password" 
          label="Password" 
          :value="password" 
          v-model="password"
          :required="true"
        />
        <button class="button-signin" @click="login">Sign in</button> 
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input/Input.vue';
import Logo from '@/assets/logo.png'

export default {
  name: 'Login',
  components: {
    Input
  },
  data: () => {
    return {
      email: '',
      password: '',
      logo: Logo
    }
  },
  methods: {
    login() {
      this.$authService.Login(this.email, this.password);
    }
  },
}
</script>

<style lang="scss">
  @import './Login.scss';
</style>