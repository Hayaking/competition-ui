<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">
      <div>asdas</div>
      <div>asdas</div>
      <div>asdas</div>
      <div>asdas</div>
      <div>asdas</div>
  </Modal>
</template>

<script>
export default {
  name: 'post-select-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    cancel () {
      this.emit('cancel')
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
