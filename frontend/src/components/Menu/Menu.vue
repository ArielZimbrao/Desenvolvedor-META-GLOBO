<template>
    <div class="menu-container">
        <div class="user-info">
            <div class="logo-container">
                <img class="logo" :src="logo" />
            </div>
            <div class="title-container">
                <span class="title">{{getEmailUser}}</span>
            </div>
        </div>
        <div class="sidenav">
          <div class="item-menu" v-for="item of menuItens" :key="item" >
            <div v-if="checkPermission(item.permission)" :class="checkPageActive(item.href)" @click="nextPage(item.href)">
              <div class="icon-menu">
                <i :class="item.icon"/>
              </div>
              <span class="item-menu-title">{{item.label}}</span>
            </div>
          </div>
        </div> 
    </div>
</template>

<script>
import Logo from '@/assets/logo.png'
import MenuMap from '@/utils/menumap.json'
import Store from "@/views/store";

export default {
  name: 'Menu',
  components: {
  },
  data() {
    return {
      logo: Logo,
      menuItens: MenuMap
    }
  },
  computed: {
    getEmailUser() {
      return Store.state.email;
    }
  },
  methods: {
    checkPermission(permissions) {
      return permissions.includes(Store.state.role);
    },
    checkPageActive(href) {
      if (this.$route.path === href) {
        return 'item active'
      } 
      return 'item'
    },
    nextPage(href) {
      if (href === '/login') {
        this.$requestService.Logoff();
      }

      this.$router.push(href)
    }
  },
}
</script>

<style lang="scss" scoped>
    @import './Menu.scss';
</style>