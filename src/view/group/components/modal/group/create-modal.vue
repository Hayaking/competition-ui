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

export default {
  name: 'group-create-modal',
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
    apply () {
      this.$refs['form'].validate(res => {
        if (res) {
          this.handleCreateTeacherGroup({ group: this.group }).then(res => {
            this.$emit('callback', res)
            this.group = {}
          })
        }
      })
    }
  },
  computed: {
    modalShow: {
      get () {
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
