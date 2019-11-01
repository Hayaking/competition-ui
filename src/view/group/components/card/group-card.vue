<template>
  <Card title="小组" style="margin-bottom: 18px">
    {{this.teacherGroup}}
  </Card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'group-card',
  computed: {
    ...mapState([
      'teacherGroup'
    ])
  }
}
</script>

<style scoped>

</style>
