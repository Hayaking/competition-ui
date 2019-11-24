<template>
  <Modal
    @on-cancel="cancel"
    :footer-hide="isHideFooter"
    :fullscreen="isFullscreen"
    width="800"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="3"><h2>编辑比赛阶段</h2></Col>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </Row>
    </div>
    <div v-if="index===0">
      <Button type="primary" @click="toEdit">添加</Button>
      <Table :columns="PROGRESS_HEAD"
             :height="height"
             :data="list">
        <template slot="typeId" slot-scope="{ row, index }">
          <div v-if="COMPETITION_TYPE[row.typeId-1] !== undefined">
            {{COMPETITION_TYPE[row.typeId-1].typeName}}
          </div>
        </template>
        <template slot="enterStartDate" slot-scope="{ row, index }">
          {{formatDate(row.enterStartTime)}}
          <br>
          {{formatDate(row.enterEndTime)}}
        </template>
        <template slot="startDate" slot-scope="{ row, index }">
          {{formatDate(row.startTime)}}
          <br>
          {{formatDate(row.endTime)}}
        </template>
        <template slot="isSingle" slot-scope="{ row, index }">
          {{isSingle(row.isSingle)}}
        </template>
        <template slot="isNeedWorks" slot-scope="{ row, index }">
          {{isNeedWorks(row.isNeedWorks)}}
        </template>
        <template slot="scanEnterState" slot-scope="{ row, index }">
          <i-switch v-model="row.isScanEnterState" size="large" @on-change="scanStateChanged(row,'enter')">
            <span slot="true">自动开启</span>
            <span slot="false">手动开启</span>
          </i-switch>
        </template>
        <template slot="scanStartState" slot-scope="{ row, index }">
          <i-switch v-model="row.isScanStartState" size="large" @on-change="scanStateChanged(row,'start')">
            <span slot="true">自动开启</span>
            <span slot="false">手动开启</span>
          </i-switch>
        </template>
        <template slot="startState" slot-scope="{ row, index }">
          <Select v-model="row.startState" @on-change="stateChange(row.id,row.startState)">
            <Option :value="0">未开始</Option>
            <Option :value="1">已开始</Option>
            <Option :value="2">已开始</Option>
            <Option :value="3">结算中</Option>
          </Select>
        </template>
        <template slot="enterState" slot-scope="{ row, index }">
          <Button :disabled="row.isScanEnterState">{{row.enterState}}</Button>
        </template>
        <template slot="actions" slot-scope="{ row, index }">
          <Button type="primary" @click="toEdit(row)">编辑</Button>
        </template>
      </Table>
    </div>
    <div v-else-if="index ===1">
      <Form :hide-required-mark="true"
            :label-width="120"
            :model="progress"
            label-position="right">
        <!--需要参赛作品 && 是单人赛-->
        <Row>
          <Col span="11">
            <FormItem label="需要参赛作品：">
              <i-switch v-model="progress.isNeedWorks" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="是单人赛：">
              <i-switch v-model="progress.isSingle" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <!--阶段名 && 阶段级别-->
        <Row>
          <Col span="11">
            <FormItem label="名称：" prop="name">
              <Input v-model="progress.name"/>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="级别：">
              <Select v-model="progress.typeId">
                <Option :key="index"
                        :value="item.id"
                        v-for="(item,index) in COMPETITION_TYPE">
                  {{item.typeName}}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <!--报名时间 && 比赛时间-->
        <Row>
          <Col span="11">
            <FormItem label="报名时间：" prop="enterDate">
              <DatePicker type="datetimerange" v-model="progress.enterDate"></DatePicker>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="比赛时间：" prop="startDate">
              <DatePicker type="datetimerange" v-model="progress.startDate"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <!-- 主办方 && 协办方 && 比赛地点-->
        <Row>
          <Col span="8">
            <FormItem label="主办方：" prop="org">
              <Input v-model="progress.org"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="协办方：" prop="coOrg">
              <Input  v-model="progress.coOrg"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="比赛地点：" prop="place">
              <Input v-model="progress.place"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="default" @click="back">返回</Button>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import { dateFomat } from '@/libs/tools'

export default {
  name: 'submit-progress-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    progressHolder: {
      Object
    }
  },
  data () {
    return {
      COMPETITION_TYPE: [],
      PROGRESS_HEAD: [
        {
          title: '阶段名称',
          key: 'name',
          width: 150,
          fixed: 'left'
        },
        {
          title: '级别',
          slot: 'typeId',
          width: 80,
          fixed: 'left'
        },
        {
          title: '报名时间',
          slot: 'enterStartDate',
          width: 170
        },
        {
          title: '比赛时间',
          slot: 'startDate',
          width: 170
        },
        {
          title: '主办方',
          key: 'org',
          width: 150
        },
        {
          title: '比赛地点',
          key: 'place',
          width: 150
        },
        {
          title: '比赛类型',
          slot: 'isSingle',
          width: 150
        },
        {
          title: '作品要求',
          slot: 'isNeedWorks',
          width: 150
        },
        {
          title: '比赛状态',
          slot: 'startState',
          width: 120,
          fixed: 'right'
        },
        {
          title: '报名状态',
          slot: 'enterState',
          width: 100,
          fixed: 'right'
        },
        {
          title: '扫描开始状态',
          width: 100,
          slot: 'scanStartState'
        },
        {
          title: '扫描报名状态',
          width: 100,
          slot: 'scanEnterState'
        },
        {
          title: '操作',
          width: 100,
          fixed: 'right',
          slot: 'actions'
        }
      ],
      isFullscreen: true,
      isHideFooter: true,
      index: 0,
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
  mounted () {
    this.handleGetType({ type: 'competition' }).then(res => {
      res.flag
        ? this.COMPETITION_TYPE = res.body
        : this.$Message.error('获取竞赛类型失败')
    })
  },
  methods: {
    ...mapActions([
      'handleGetProgressListByCompetitionId',
      'handleSaveProgress',
      'handleUpdateProgress',
      'handleGetType',
      'handleUpdateProgressScanState',
      'handleUpdateProgressState'
    ]),
    full () {
      this.isFullscreen = !this.isFullscreen
    },
    cancel () {
      this.index = 0
      this.progress = {}
      this.$emit('cancel')
    },
    getProgressList () {
      this.handleGetProgressListByCompetitionId({
        competitionId: this.progressHolder.competitionId
      }).then(res => {
        this.list = res.body
      })
    },
    submit () {
      this.handleUpdateProgress({ progress: this.progress }).then(res => {
        if (res) {
          this.getProgressList()
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    selectChanged (id) {
      this.progress = this.list.filter(item => {
        return item.id === id
      })[0]
      console.info(this.progress)
    },
    /**
     * 格式化时间
     * @param time
     */
    formatDate (time) {
      return dateFomat(time)
    },
    toEdit (progress) {
      this.progress = progress
      this.progress.competitionId = this.progressHolder.competitionId
      this.isHideFooter = false
      this.index++
    },
    back () {
      this.progress = {}
      this.isHideFooter = true
      this.index--
    },
    isSingle (state) {
      return state ? '单人赛' : '小组赛/多人赛'
    },
    isNeedWorks (state) {
      return state ? '需要作品' : '不需要作品'
    },
    scanStateChanged (progress, name) {
      let flag = progress.isScanEnterState
      let id = progress.id
      this.handleUpdateProgressScanState({ id, name, flag }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    stateChange (id, state) {
      this.handleUpdateProgressState({ id, state }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
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
    },
    height () {
      return window.innerHeight - 100
    }
  },
  watch: {
    progressHolder: {
      handler () {
        this.getProgressList()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
