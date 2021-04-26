<template>
  <div class="page-container">
    <Menu/>
    <div class="user-container">
      <div class="add-user-container">
        <div class="btn-create">
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
      <div class="list-user-container">
        <div class="user" v-for="user of users" v-bind:key="user">
          <div class="info">
            <span class="info-email">{{user.email}}</span>
            <span class="info-role">{{user.role}}</span>
          </div>
          <div class="actions">
            <div class="btn-edit">
              <i class="fas fa-edit"></i>
            </div>
            <div class="btn-delete">
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/Menu/Menu.vue'

export default {
  name: 'User',
  components: {
    Menu
  },
  
  beforeCreate() {
    if(!this.$requestService.IsAuthenticate()) {
      this.$router.push('/login');
    }

    this.$requestService.GetAllUser().then((result) => {
      this.updateUser(result);
    });
  },
  methods: {
    updateUser(users) {
      this.users = users;
    }
  },
  data: function() {
    return {
      users: [],
    }
  },
}
</script>
<style lang="scss" scoped>
  @import './User.scss';
</style>