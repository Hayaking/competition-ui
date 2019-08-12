<template>
  <div @click="clicked">
    <Card>{{item.groupName}}</Card>
  </div>
</template>

<script>
export default {
  name: 'message_sender_item',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    clicked () {
      this.$emit('clicked', this.item)
    }
  }
}
</script>

<style scoped>

</style>
