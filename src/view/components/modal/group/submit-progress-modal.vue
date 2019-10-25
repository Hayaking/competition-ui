<template>
  <Modal
    @on-cancel="cancel"
    :fullscreen="fullscreen"
    width="500"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="3"><h2>编辑比赛</h2></Col>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </Row>
    </div>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
        <Form ref="form" >
          <FormItem label="报名状态">
            <Select>
              <Option>未开始</Option>
              <Option>已开始</Option>
              <Option>已结束</Option>
            </Select>
          </FormItem>
          <FormItem label="比赛状态">
            <Select>
              <Option>未开始</Option>
              <Option>已开始</Option>
              <Option>已结束</Option>
            </Select>
          </FormItem>
          <FormItem label="比赛进度">
            <Select>
              <Option>院赛</Option>
              <Option>省赛</Option>
              <Option>国赛</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Col span="2"></Col>
    </Row>
    <div slot="footer">
      <Button type="default">取消</Button>
      <Button type="primary">提交</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'submit-progress-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fullscreen: false
    }
  },
  methods: {
    full () {
      this.fullscreen = !this.fullscreen
    },
    cancel () {
      this.$emit('cancel')
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
