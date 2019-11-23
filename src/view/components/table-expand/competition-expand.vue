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
    <Table size="small" :columns="PROGRESS_HEAD" :data="row.progressList">
      <template slot-scope="{ row, index }" slot="name">
        {{row.name}}
      </template>
      <template slot-scope="{ row, index }" slot="typeId">
        {{COMPETITION_TYPE[row.typeId-1].typeName}}
      </template>
      <template slot-scope="{ row, index }" slot="isSingle">
        {{isSingle(row.isSingle)}}
      </template>
      <template slot-scope="{ row, index }" slot="isNeedWorks">
        {{isNeedWorks(row.isNeedWorks)}}
      </template>
      <template slot-scope="{ row, index }" slot="key">
        {{row.key}}
      </template>
      <!--报名开始时间-->
      <template slot="enterStartDate" slot-scope="{ row, index }">
        {{formatDate(row.enterStartTime)}}
        <br>
        {{formatDate(row.enterEndTime)}}
      </template>
      <!--比赛开始时间-->
      <template slot="startDate" slot-scope="{ row, index }">
        {{formatDate(row.startTime)}}
        <br>
        {{formatDate(row.endTime)}}
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
    row: Object
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
          slot: 'name'
        },
        {
          title: '级别',
          slot: 'typeId',
          width: 80
        },
        {
          title: '开始时间',
          slot: 'enterStartDate'
        },
        {
          title: '结束时间',
          slot: 'startDate'
        },
        {
          title: '主办方',
          key: 'org'
        },
        {
          title: '比赛地点',
          key: 'place'
        },
        {
          title: '比赛类型',
          slot: 'isSingle'
        },
        {
          title: '作品要求',
          slot: 'isNeedWorks'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleGetType'
    ]),
    formatDate (time) {
      return dateFomat(time)
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

<style scoped>

</style>
