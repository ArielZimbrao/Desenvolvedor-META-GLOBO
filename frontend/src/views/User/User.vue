<template>
  <div class="page-container">
    <Menu/>
    <div class="user-container">
      <div class="add-user-container">
        <div class="btn-create" @click="openCloseModalUser()">
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
      <div class="list-user-container">
        <div class="user" v-for="user of users" v-bind:key="user.id">
          <div class="info">
            <span class="info-email">{{user.email}}</span>
            <span class="info-role">{{user.role}}</span>
          </div>
          <div class="actions">
            <div class="btn-edit" @click="openCloseModalUser(user)">
              <i class="fas fa-edit"></i>
            </div>
            <div class="btn-delete" @click="openCloseAlertRemove(user)">
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalUser :show="showModalUser" :user="user" :close="openCloseModalUser"/>
    <AlertRemoveUser :show="showAlertRemove" :user="user" :close="openCloseAlertRemove"/>
  </div>
</template>
<script>
import Menu from '@/components/Menu/Menu.vue'
import ModalUser from '@/components/ModalUser/ModalUser.vue'
import AlertRemoveUser from '@/components/AlertRemoveUser/AlertRemoveUser.vue'

export default {
  name: 'User',
  components: {
    Menu,
    ModalUser,
    AlertRemoveUser
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
    },
    openCloseAlertRemove(user) {
      if(this.showAlertRemove) {
        this.$requestService.GetAllUser().then((result) => {
          this.updateUser(result);
        });
      }
      this.user = user;
      this.showAlertRemove = !this.showAlertRemove;
    },
    openCloseModalUser(user) {
      if(this.showModalUser) {
        this.$requestService.GetAllUser().then((result) => {
          this.updateUser(result);
        });
      }
      this.user = user;
      this.showModalUser = !this.showModalUser;
    }
  },
  data: function() {
    return {
      users: [],
      showModalUser: false,
      showAlertRemove: false,
      user: null,
    }
  },
}
</script>
<style lang="scss" scoped>
  @import './User.scss';
</style>