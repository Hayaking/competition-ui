<template>
  <Modal
    @on-cancel="cancel"
    @on-ok="submit"
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
    <Form ref="form" label-position="top">
      <FormItem label="竞赛小结：">
        <Input type="textarea" v-model="summary"/>
      </FormItem>
      <FormItem label="赛事行程：">
        <div v-for="(item,index) in this.processList"
                  v-if="item.showState"
                  :key="index">
          {{item.time}}
          {{item.description}}
        </div>
        <Select size="small" v-model="processId" @on-change="selectChanged">
          <Option v-for="(item,index) in this.processList"
                  :value="item.id"
                  v-if="!item.showState"
                  :key="index">
            {{item}}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="经费使用：">
        <br>
        <div v-for="(item,index) in this.costList" :key="index">
          <Row>
            <Col span="7">subject: <Input type="text" v-model="item.subject"/></Col>
            <Col span="7" offset="1">value: <Input  type="text" v-model="item.value"/></Col>
            <Col span="7" offset="1">reason: <Input  type="text" v-model="item.reason"/></Col>
          </Row>
        </div>
        <Button @click="addCost"/>
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
    progressId: { Number }
  },
  data () {
    return {
      fullscreen: false,
      processList: [],
      costList: [],
      processId: 0,
      summary: ''
    }
  },
  methods: {
    ...mapActions([
      'handleGetProcessListByProgressId',
      'handleSubmitResult'
    ]),
    full () {
      this.fullscreen = !this.fullscreen
    },
    cancel () {
      this.$emit('cancel')
    },
    getProcessList () {
      this.handleGetProcessListByProgressId({ progressId: this.progressId }).then(res => {
        this.processList = res.body.map(item => {
          item.showState = false
          return item
        })
      })
    },
    selectChanged (id) {
      this.processList = this.processList.map(item => {
        if (item.id === id) {
          item.showState = true
        }
        return item
      })
    },
    addCost () {
      this.costList.push({
        subject: '',
        value: '',
        reason: ''
      })
    },
    submit () {
      let params = {
        summary: this.summary,
        costList: this.costList,
        processList: this.processList
      }
      this.handleSubmitResult({ progressId: this.progressId, params }).then(res => {

      })
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.show
      },
      set (val) {}
    }
  },
  watch: {
    show: {
      handler () {
        this.getProcessList()
      }
    }
  }
}
</script>

<style scoped>

</style>
