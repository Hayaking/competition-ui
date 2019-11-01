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
        <Form ref="form" label-position="left">
          <FormItem label="比赛进度">
            <Select  @on-change="selectChanged">
              <Option v-for="(item,index) in list"
                      :value="item.id"
                      :key="index">
                {{competitionType[item.typeId-1].typeName}}
              </Option>
            </Select>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="扫描开始：">
                <i-switch :value="progress.isScanStartState" size="large">
                  <span slot="true">自动开启</span>
                  <span slot="false">手动开启</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="扫描报名：">
                <i-switch v-model="progress.isScanEnterState" size="large">
                  <span slot="true">自动开启</span>
                  <span slot="false">手动开启</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="报名状态">
            <Select v-model="progress.enterState" :disabled ="progress.isScanEnterState">
              <Option value="未开始">未开始</Option>
              <Option value="已开始">已开始</Option>
              <Option value="已结束">已结束</Option>
            </Select>
          </FormItem>
          <FormItem label="比赛状态">
            <Select v-model="progress.startState" :disabled ="progress.isScanStartState">
              <Option value="未开始">未开始</Option>
              <Option value="已开始">已开始</Option>
              <Option value="已结束">已结束</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Col span="2"></Col>
    </Row>
    <div slot="footer">
      <Button type="default" @click="cancel">取消</Button>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'submit-progress-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    progressHolder: {
      Object
    },
    competitionType: { Array }
  },
  data () {
    return {
      fullscreen: false,
      progress: {
        isScanStartState: true,
        isScanEnterState: true,
        enterState: 0,
        startState: 0,
        id: 0
      },
      list: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetProgressListByCompetitionId',
      'handleSaveProgress'
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
    },
    submit () {
      this.handleSaveProgress({ progress: this.progress }).then(res => {
        res ? this.$Message.success('成功') : this.$Message.error('失败')
      })
    },
    selectChanged (id) {
      this.progress = this.list.filter(item => {
        return item.id === id
      })[0]
      console.info(this.progress)
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
    progressHolder: {
      handler (newVal) {
        this.getProgressList(newVal.competitionId)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
