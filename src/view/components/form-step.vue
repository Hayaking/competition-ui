<template>
  <Steps :current="stepIndex">
    <Step v-for="(item,index) in stepTitle"
          :key="index"
          :title="item"
          :content="stepContent[index]" />
  </Steps>
</template>

<script>
export default {
  name: 'form-step',
  props: {
    stepIndex: {
      type: Number,
      default: 0
    },
    stepTitle: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {
    stepContent () {
      return this.stepTitle.map((item, index) => {
        return index > this.stepIndex ? '待进行'
          : index < this.stepIndex ? '已进行' : '进行中'
      })
    }
  }
}
</script>

<style scoped>

</style>
