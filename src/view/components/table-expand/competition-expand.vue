<template>
  <div>
    <CellGroup>
      <Row>
        <Col span="24">
          <Cell>
            <div slot="icon">比赛简介</div>
            <div slot="label">{{ row.intro }}</div>
          </Cell>
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
                <div slot="label">{{ row.stuNum }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">预期参赛队伍数:</div>
                <div slot="label">{{ row.groupNum }}</div>
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
                <div slot="label">{{ row.personInCharge }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">立项者:</div>
                <div slot="label">{{ row.creator }}</div>
              </Cell>
            </Col>
            <Col span="8">
              <Cell>
                <div slot="icon">立项工作组:</div>
                <div slot="label">{{ row.teacherGroupId }}</div>
              </Cell>
            </Col>
          </Row>
          <Cell>
            <div slot="icon">比赛进度:</div>
            <div slot="label">
              <Table size="small" :columns="PROGRESS_HEAD" :data="row.progressList">
                <template slot-scope="{ row, index }" slot="typeId">
                  {{COMPETITION_TYPE[row.typeId-1].typeName}}
                </template>
                <template slot-scope="{ row, index }" slot="enterStartTime">
                  {{formatDate(row.enterStartTime)}}
                </template>
                <template slot-scope="{ row, index }" slot="enterEndTime">
                  {{formatDate(row.enterEndTime)}}
                </template>
                <template slot-scope="{ row, index }" slot="startTime">
                  {{formatDate(row.startTime)}}
                </template>
                <template slot-scope="{ row, index }" slot="endTime">
                  {{formatDate(row.endTime)}}
                </template>
                <template slot-scope="{ row, index }" slot="startState">
                  {{formatDate(row.startState)}}
                </template>
                <template slot-scope="{ row, index }" slot="enterState">
                  {{formatDate(row.enterState)}}
                </template>
              </Table>
            </div>
          </Cell>
        </Col>
      </Row>
    </CellGroup>
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
          title: '级别',
          slot: 'typeId'
        },
        {
          title: '报名开始时间',
          slot: 'enterStartTime',
          width: 180
        },
        {
          title: '报名结束时间',
          slot: 'enterEndTime',
          width: 180
        },
        {
          title: '开始时间',
          slot: 'startTime',
          width: 180
        },
        {
          title: '结束时间',
          slot: 'endTime',
          width: 180
        },
        {
          title: '开始状态',
          key: 'startState'
        },
        {
          title: '报名状态',
          key: 'enterState'
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
    }
  }
}
</script>

<style scoped>

</style>
