<template>
  <div>
    <Row>
      <Col span="24">
        <Table :columns="PROGRESS_HEAD"
               :data="progressList"
               :loading="isLoading"
               :row-class-name="rowClassName"
               size="small">
          <template slot="typeId" slot-scope="{ row, index }">
            <div v-if="COMPETITION_TYPE[row.typeId-1] !== undefined">
              {{COMPETITION_TYPE[row.typeId-1].typeName}}
            </div>
          </template>
          <template slot="enterStartDate" slot-scope="{ row, index }">
            {{formatDate(row.enterStartTime)}}
            →
            {{formatDate(row.enterEndTime)}}
          </template>
          <template slot="startDate" slot-scope="{ row, index }">
            {{formatDate(row.startTime)}}
            →
            {{formatDate(row.endTime)}}
          </template>

          <template slot="startState" slot-scope="{ row, index }">
            {{formatDate(row.startState)}}
          </template>
          <template slot="enterState" slot-scope="{ row, index }">
            {{formatDate(row.enterState)}}
          </template>
          <template slot="action" slot-scope="{ row, index }">
            <Button :disabled="row.startState !== '结算中'"
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
          slot: 'typeId'
        },
        {
          title: '报名开始时间',
          slot: 'enterStartDate',
          align: 'center',
          width: 300
        },
        {
          title: '开始时间',
          slot: 'startDate',
          align: 'center',
          width: 300
        },
        {
          title: '开始状态',
          key: 'startState'
        },
        {
          title: '报名状态',
          key: 'enterState'
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
      if (row.startState === '已开始') {
        return 'table-info-primary'
      } else if (row.startState === '结算中') {
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
