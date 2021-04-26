<template>
    <div class="modal-user-container">

    </div>
</template>

<script>
//import Store from "@/views/store";

export default {
  name: 'ModalUser',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false, 
    },
    userId: {
      type: Number,
      default: null
    }
  },
  watch: {
    'userId': () => {
      
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
    @import './ModalUser.scss';
</style>