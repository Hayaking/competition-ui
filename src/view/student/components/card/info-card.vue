<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="md-megaphone" />
      动态
    </div>
    <Divider>
      <div style="color:#9ea7b4;font-size: 12px">什么都没有</div>
    </Divider>
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
