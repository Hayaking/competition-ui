<template>
  <Modal
    @on-cancel="cancel"
    :footer-hide="true"
    :fullscreen="fullscreen"
    width="800"
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

  </Modal>
</template>

<script>
export default {
  name: 'group-edit-competition',
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
