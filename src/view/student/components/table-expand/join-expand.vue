<template>
  <div>
    <Row>
      <Col span="24">
        <Table :columns="PROGRESS_HEAD"
               :data="progressList"
               :loading="isLoading"
               :row-class-name="rowClassName"
               size="small">
          <!--阶段名-->
          <template slot="typeId" slot-scope="{ row, index }">
            <div v-if="COMPETITION_TYPE[row.progress.typeId-1] !== undefined">
              {{COMPETITION_TYPE[row.progress.typeId-1].typeName}}
            </div>
          </template>
          <!--报名开始时间-->
          <template slot="enterStartDate" slot-scope="{ row, index }">
            {{formatDate(row.progress.enterStartTime)}}
            <br>
            {{formatDate(row.progress.enterEndTime)}}
          </template>
          <!--比赛开始时间-->
          <template slot="startDate" slot-scope="{ row, index }">
            {{formatDate(row.progress.startTime)}}
            <br>
            {{formatDate(row.progress.endTime)}}
          </template>
          <!--阶段比赛开始状态-->
          <template slot="startState" slot-scope="{ row, index }">
            <div v-if="row.progress.startState === 0">未开始</div>
            <div v-if="row.progress.startState === 1">已开始</div>
            <div v-if="row.progress.startState === 2">结算中</div>
            <div v-if="row.progress.startState === 3">已结束</div>
          </template>
          <!--阶段报名开始状态-->
          <template slot="enterState" slot-scope="{ row, index }">
            <div v-if="row.progress.enterState === 0">未开始</div>
            <div v-if="row.progress.enterState === 1">已开始</div>
            <div v-if="row.progress.enterState === 2">结算中</div>
            <div v-if="row.progress.enterState === 3">已结束</div>
          </template>
          <template slot="isEnter" slot-scope="{ row, index }">
            <div v-if="row.progress.enterState === -1">拒绝</div>
            <div v-if="row.progress.enterState === 0">等待审核</div>
            <div v-if="row.progress.enterState === 1">报名成功</div>
          </template>
          <template slot="isPrice" slot-scope="{ row, index }">
            <div v-if="row.isPrice">是</div>
            <div v-else>否</div>
          </template>
          <template slot="isPromotion" slot-scope="{ row, index }">
            <div v-if="row.isPromotion">是</div>
            <div v-else>否</div>
          </template>
          <template slot="action" slot-scope="{ row, index }">
            <Button :disabled="isClick(row)"
                    @click="showResult(row.id)"
                    size="small"
                    type="primary">
              提交结果
            </Button>
          </template>
        </Table>
      </Col>
    </Row>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'
import { mapActions } from 'vuex'

export default {
  name: 'stu-join-expand',
  props: {
    row: Object,
    flag: Boolean
  },
  mounted () {
    this.handleGetType({ type: 'competition' }).then(res => {
      res.flag
        ? this.COMPETITION_TYPE = res.body
        : this.$Message.error('获取竞赛类型失败')
    })
  },
  data () {
    return {
      COMPETITION_TYPE: [],
      PROGRESS_HEAD: [
        {
          title: '级别',
          slot: 'typeId',
          align: 'center',
          width: 80
        },
        {
          title: '报名开始时间',
          slot: 'enterStartDate',
          align: 'center',
          width: 160
        },
        {
          title: '开始时间',
          slot: 'startDate',
          align: 'center',
          width: 160
        },
        {
          title: '开始状态',
          slot: 'startState'
        },
        {
          title: '报名状态',
          slot: 'enterState'
        },
        {
          title: '报名成功',
          slot: 'isEnter'
        },
        {
          title: '是否得奖',
          slot: 'isPrice'
        },
        {
          title: '是否晋级',
          slot: 'isPromotion'
        },
        {
          title: '操作',
          align: 'center',
          width: 120,
          slot: 'action'
        }
      ],
      progressList: [],
      isLoading: true
    }
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetProgressListByJoinId'
    ]),
    /**
       * 格式化时间
       * @param time
       */
    formatDate (time) {
      return dateFomat(time)
    },
    showResult (id) {
      this.$emit('showResult', id)
    },
    rowClassName (row, index) {
      if (row.progress.startState === '已开始') {
        return 'table-info-primary'
      } else if (row.progress.startState === '结算中') {
        return 'table-info-warning'
      }
      return ''
    },
    getProgressList (id) {
      this.isLoading = true
      this.handleGetProgressListByJoinId({ joinId: id }).then(res => {
        this.progressList = res.body
        this.isLoading = false
      })
    },
    isClick (row) {
      // if (row.progress.startState === '2' && row.isEditable) {
      //   return !row.isPromotion
      // }
      console.info(row.progress.startState)
      return row.progress.startState !== 2
    }
  },
  computed: {
    startTime () {
      return dateFomat(this.row.competition.startTime)
    },
    endTime () {
      return dateFomat(this.row.competition.endTime)
    },
    enterStartTime () {
      return dateFomat(this.row.competition.enterStartTime)
    },
    enterEndTime () {
      return dateFomat(this.row.competition.enterEndTime)
    }
  },
  watch: {
    row: {
      handler (val) {
        this.getProgressList(val.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
  .ivu-table .table-info-primary td {
    background-color: #2db7f5 !important;
    color: #fff;
  }

  .ivu-table .table-info-warning td {
    background-color: #ffe70c !important;
    color: #14161d;
  }

  .ivu-table .table-info-success td {
    background-color: #187 !important;
    color: #fff;
  }
</style>
