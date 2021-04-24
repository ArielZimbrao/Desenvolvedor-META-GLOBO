<template>
  <div class="login-background">
    <div class="login-container">
      <div class="logo-container">
        <img class="logo" :src="logo" />
      </div>
      <form class="form-container">
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
        <button class="button-signin" type="submit" @click="login">Sign in</button> 
      </form>
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
      console.log(this.email)
    }
  },
}
</script>

<style lang="scss">
  @import './Login.scss';
</style>