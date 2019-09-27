<template>
  <Card>
    <Row>
      <Col span="8">&nbsp;</Col>
      <Col span="8">
        <Form  ref="form" :model="group" :rules= "rules">
          <FormItem label="工作组名：" prop="name">
            <Input v-model="group.name" placeholder="请输入" type="text"/>
          </FormItem>
          <FormItem label="申请理由：" prop="reason">
            <Input v-model="group.reason" placeholder="请输入" type="textarea" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="apply">申请</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span="8">&nbsp;</Col>
    </Row>
  </Card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'teacher_group',
  data () {
    return {
      group: {
        name: '',
        reason: ''
      },
      rules: {
        name: [{ required: true, message: '不为空' }],
        reason: [{ required: true, message: '不为空' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleCreateTeacherGroup'
    ]),
    ...mapMutations([
      'closeTag'
    ]),
    apply () {
      this.$refs['form'].validate(res => {
        if (res) {
          this.handleCreateTeacherGroup({ group: this.group }).then(res => {
            if (res) {
              this.$Message.success('申请中')
              this.closeTag({ name: 'teacher_group' })
              this.$router.push({ name: 'teacher_group_list' })
            } else {
              this.$Message.error('申请失败')
              this.group = {}
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
