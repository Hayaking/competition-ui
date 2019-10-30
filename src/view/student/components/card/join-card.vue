<template>
  <Card  style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      参赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'join-card',
  methods: {
    more () {
      this.$router.push({
        name: 'stu_join_list'
      })
    }
  }
}
</script>

<style scoped>

</style>
