<template>
    <div class="modal-user-container" v-if="show">
      <div class="modal">
        <span class="title-modal">{{title}}</span>
        <Input 
          class="input"
          label="email" 
          name="email" 
          v-model="email" 
          :value="email" 
          :required="true"
        />
        <div class="password-container">
          <Input 
            class="input"
            type="password" 
            label="password" 
            name="password" 
            v-model="password" 
            :required="true"
          />
          <Input 
            class="input"
            type="password" 
            label="confirm passwod" 
            name="confirm-password" 
            v-model="confirmPassword" 
            :required="true"
          />
        </div>
        <div class="role-container">
          <span class="title">Role</span>
          <v-select 
            class="role-select" 
            v-model="role"
            :options="roleOptions"
            :key="role"
          />
        </div>
        <div class="actions-container">
          <div class="btn-save" @click="saveDataModal">Save</div>
          <div class="btn-cancel" @click="closeModal">Cancel</div>
        </div>
      </div>
    </div>
</template>

<script>
//import Store from "@/views/store";
import Input from '@/components/Input/Input.vue'
import AccessLevelEnum from '@/utils/access-level.enum.js'
import { CryptoHandler } from '@/utils/crypto-handler.js'

export default {
  name: 'ModalUser',
  components: {
    Input
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      role: null,
      title: 'Create User',
      roleOptions: ['ADMIN', 'EMPLOYEE']
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false, 
    },
    user: {
      type: Object,
      default: null
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    'user'(user) {
      if (user) {
        this.title = 'Edit User';
        this.email = user.email;
        this.role = user.role;
      } else {
        this.title = 'Create User';
      }
    }
  },
  methods: {
    setSelected(newrole) {
      this.role = AccessLevelEnum[newrole]
    },
    closeModal() {
      this.email = '';
      this.password = '';
      this.role = null,
      this.confirmPassword = '',

      this.close();
    },
    validForm() {
      if (this.user && this.user.id && (this.email === '' || this.role === null)) {
        this.$toast.open({
          message: 'Filling in email and role is mandatory when editing a user!',
          type: 'error'
        });
        return false;
      } 
      
      if (!this.user && (this.password === '' || this.confirmPassword === '' || this.email === '' || this.role === null)) {
        this.$toast.open({
          message: 'All fields are mandatory in creating a user!',
          type: 'error'
        });
        return false;
      } 
      
      if (this.password !== this.confirmPassword) {
        this.$toast.open({
          message: 'The value of the password and confirm password fields must be the same!',
          type: 'error'
        });
        return false;
      } 

      return true;
    },
    saveDataModal() {
      if (this.validForm()) {
        const body = {
          email: this.email,
          role: AccessLevelEnum[this.role],
          password: CryptoHandler.encrypt(this.password),
          id: this.user && this.user.id ? this.user.id : null
        };
        this.$requestService.SaveUser(body).then(() => {
          this.$toast.open({
            message: 'User saved successfully!',
            type: 'success'
          });
          this.closeModal();
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
    @import './ModalUser.scss';
</style>