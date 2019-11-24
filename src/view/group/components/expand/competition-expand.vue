<template>
  <div>
    <CellGroup>
      <Row>
        <Col span="24">
          <Cell>
            <div slot="icon">比赛流程</div>
            <div slot="label">{{ row.process }}</div>
          </Cell>
          <Cell>
            <div slot="icon">预期结果</div>
            <div slot="label">{{ row.exRes }}</div>
          </Cell>
          <Row>
            <Col span="8">
              <Cell>
                <div slot="icon">预期参赛人数:</div>
                <div slot="label">{{ row.exStuNum }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">预期参赛队伍数:</div>
                <div slot="label">{{ row.exGroupNum }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">参赛形式:</div>
                <div slot="label">{{ row.joinTypeId }}</div>
              </Cell>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Cell>
                <div slot="icon">负责人:</div>
                <div slot="label">{{ row.personInCharge.teacherName }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">立项者:</div>
                <div slot="label">{{ row.creator.teacherName }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">立项工作组:</div>
                <div slot="label">{{ row.teacherGroupId }}</div>
              </Cell>
            </Col>
          </Row>
        </Col>
      </Row>
    </CellGroup>
    <Table :columns="PROGRESS_HEAD"
           :data="row.progressList"
           :row-class-name="rowClassName"
           size="small">
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
      <template slot="startState" slot-scope="{ row, index }">
        {{formatDate(row.startState)}}
      </template>
      <template slot="enterState" slot-scope="{ row, index }">
        {{formatDate(row.enterState)}}
      </template>
    </Table>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'
import { mapActions } from 'vuex'

export default {
  name: 'competition-expand',
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
          title: '开始时间',
          slot: 'enterStartDate',
          width: 170
        },
        {
          title: '结束时间',
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
          title: '开始状态',
          key: 'startState',
          width: 100,
          fixed: 'right'
        },
        {
          title: '报名状态',
          key: 'enterState',
          width: 100,
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleGetType'
    ]),
    /**
       * 格式化时间
       * @param time
       */
    formatDate (time) {
      return dateFomat(time)
    },
    rowClassName (row, index) {
      if (row.startState === '已开始') {
        return 'table-info-primary'
      } else if (row.startState === '结算中') {
        return 'table-info-warning'
      }
      return ''
    },
    isSingle (state) {
      return state ? '单人赛' : '小组赛/多人赛'
    },
    isNeedWorks (state) {
      return state ? '需要作品' : '不需要作品'
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
