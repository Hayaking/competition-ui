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
import { mapActions } from 'vuex'

export default {
  name: 'submit-result',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    resultHolder: { Object }
  },
  data () {
    return {
      fullscreen: false,
      list: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetProgressListByCompetitionId'
    ]),
    full () {
      this.fullscreen = !this.fullscreen
    },
    cancel () {
      this.$emit('cancel')
    },
    getProgressList (id) {
      this.handleGetProgressListByCompetitionId({ competitionId: id }).then(res => {
        this.list = res.body
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
  },
  watch: {
    resultHolder: {
      handler (newVal) {
        this.getProgressList(newVal.competitionId)
        // this.getProcessPage(newVal.competitionId)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
