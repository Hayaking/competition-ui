<template>
  <Card>
    工作组名：<Input v-model="groupName" placeholder="请输入" style="width: 300px" />
    <Button type="primary" @click="apply">申请</Button>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create_teacher_group',
  data () {
    return {
      groupName: ''
    }
  },
  methods: {
    ...mapActions([
      'handleCreateTeacherGroup'
    ]),
    apply () {
      if (this.groupName.trim() === '') {
        this.$Message.error('申请失败')
        return
      }
      this.handleCreateTeacherGroup({ groupName: this.groupName }).then(res => {
        if (res) {
          this.$Message.success('申请中')
        } else {
          this.$Message.error('申请失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
