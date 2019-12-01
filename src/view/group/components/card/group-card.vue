<template>
  <Card title="小组" style="margin-bottom: 18px">
    <div>工作组名称：{{this.teacherGroup.name}}</div>
    <div>组长：{{this.teacherGroup.creator.teacherName}}</div>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'group-card',
  computed: {
    ...mapGetters([
      'getTeacherGroup'
    ]),
    teacherGroup () {
      return this.getTeacherGroup
    }
  }
}
</script>

<style scoped>

</style>
