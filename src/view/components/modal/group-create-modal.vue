<template>
  <Modal
    title="创建工作组"
    @on-ok="apply"
    @on-cancel="cancel"
    v-model="modalShow">
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Form  ref="form" :model="group" :rules= "rules">
          <FormItem label="工作组名：" prop="name">
            <Input v-model="group.name" placeholder="请输入" type="text"/>
          </FormItem>
          <FormItem label="申请理由：" prop="reason">
            <Input v-model="group.reason" placeholder="请输入" type="textarea" />
          </FormItem>
        </Form>
      </Col>
      <Col span="2">&nbsp;</Col>
    </Row>
  </Modal>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'group-invite-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getter: this.$store.getters,
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
    cancel () {
      this.$emit('cancel')
    },
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
  },
  computed: {
    modalShow: {
      get () {
        // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-side-effects-in-computed-properties
        this.$store.dispatch('handleGetRoleList').then(res => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.right = res
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.left = this.userRoles
        })
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
