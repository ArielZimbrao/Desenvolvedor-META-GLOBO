<template>
  <div class="modal-remove-user-container" v-if="show">
    <div class="modal">
      <span class="title-modal">{{ title }}</span>
      <span class="text-alert-remove">
        Are you sure you want to remove the user
        <strong>{{email}}</strong> | <strong>{{role}}</strong>?
      </span>
      <div class="actions-container">
        <div class="btn-save" @click="saveDataModal">Save</div>
        <div class="btn-cancel" @click="closeModal">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
//import Store from "@/views/store";

export default {
  name: 'AlertRemoveUser',
  components: {
  },
  data() {
    return {
      email: '',
      role: null,
      title: 'Remove User'
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
  computed: {
    textAlert() {
      return `Are you sure you want to remove the user ${this.email} | ${this.role}?`
    }
  },
  watch: {
    'user'(user) {
      if (user) {
        this.email = user.email;
        this.role = user.role;
      } else {
        this.email = '';
        this.role = null;
      }
    }
  },
  methods: {

    closeModal() {
      this.email = '';
      this.role = null,

      this.close();
    },
    saveDataModal() {
      this.$requestService.RemoveUser(this.user.id).then(() => {
        this.$toast.open({
          message: 'User removed successfully!',
          type: 'success'
        });
        this.closeModal();
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./AlertRemoveUser.scss";
</style>