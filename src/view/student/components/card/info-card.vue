<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="md-megaphone" />
      动态
    </div>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'join-card',
  computed: {
    ...mapGetters([
      'getStudentGroup'
    ]),
    group: {
      get () {
        return this.getStudentGroup
      },
      set (val) {
        this.setStudentGroup(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
