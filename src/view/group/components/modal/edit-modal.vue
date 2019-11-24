<template>
  <Modal
    @on-ok="toValidate"
    @on-cancel="cancel"
    :fullscreen="isFullscreen"
    width="1000"
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
    <Form1 :flag="flag" @callBack="callBack"/>
  </Modal>
</template>

<script>
import Form1 from '@/view/group/components/form/competition-form1'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'group-edit-competition',
  components: { Form1 },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFullscreen: true,
      flag: false
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateCompetition'
    ]),
    ...mapMutations([
      'setCreateCompetition'
    ]),
    full () {
      this.isFullscreen = !this.isFullscreen
    },
    cancel () {
      this.competition = {}
      this.$emit('cancel')
      this.flag = false
    },
    toValidate () {
      this.flag = true
    },
    callBack () {
      this.handleUpdateCompetition({ competition: this.competition }).then(res => {
        this.$Message.info(res)
      })
    }
  },
  computed: {
    ...mapGetters([
      'getCreateCompetition'
    ]),
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    },
    competition: {
      get () {
        return this.getCreateCompetition
      },
      set (val) {
        this.setCreateCompetition(val)
      }
    }

  }
}
</script>

<style scoped>

</style>
