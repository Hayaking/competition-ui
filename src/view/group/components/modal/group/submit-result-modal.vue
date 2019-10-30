<template>
  <Modal
    @on-cancel="cancel"
    :footer-hide="true"
    :fullscreen="fullscreen"
    width="800"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="4"><h2>提交比赛结果</h2></Col>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </Row>
    </div>
    <Form ref="form" label-position="left">
      <FormItem label="比赛进度">
        <Select>
          <Option v-for="(item,index) in list"
                  :value="item.id"
                  :key="index">
            {{competitionType[item.typeId-1].typeName}}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  name: 'submit-result',
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
