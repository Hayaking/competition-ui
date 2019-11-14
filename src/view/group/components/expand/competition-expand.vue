<template>
<!--  <div>-->
    <CellGroup>
      <Row>
        <Col span="22">
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
            <div slot="label">
              <Table size="small"
                     :row-class-name="rowClassName"
                     :columns="PROGRESS_HEAD"
                     :data="row.progressList">
                <template slot-scope="{ row, index }" slot="typeId">
                  <div v-if="COMPETITION_TYPE[row.typeId-1] !== undefined">
                    {{COMPETITION_TYPE[row.typeId-1].typeName}}
                  </div>
                </template>
                <template slot-scope="{ row, index }" slot="enterStartDate">
                  {{formatDate(row.enterStartTime)}}
                  →
                  {{formatDate(row.enterEndTime)}}
                </template>
                <template slot-scope="{ row, index }" slot="startDate">
                  {{formatDate(row.startTime)}}
                  →
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
        <Col span="2">
          <ButtonGroup vertical>
                <Button @click="showEnterList(row.id)" type="primary">
                  报名列表
                </Button>
                <Button @click="toSetProgress(row.id)" type="primary">
                  设置比赛进度
                </Button>
                <Button :disabled="flag" @click="showProcess(row.id)" type="primary">
                  提交比赛过程
                </Button>
                <Button :disabled="flag" @click="showResult(row.id)" type="primary">
                  查看比赛结果
                </Button>
                <Button @click="showEdit(row.id, true)" type="success">
                  编辑
                </Button>
                <Button @click="toDelete(row.id)" type="error">
                  删除
                </Button>
              </ButtonGroup>
        </Col>
      </Row>
    </CellGroup>
<!--  </div>-->
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
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleGetType'
    ]),
    showEnterList (id) {
      this.$emit('showEnterList', id)
    },
    showProcess (id) {
      this.$emit('showProcess', id)
    },
    showResult (id) {
      this.$emit('showResult', id)
    },
    toDelete (id) {
      this.$emit('toDelete', id)
    },
    showEdit (id) {
      this.$emit('toEdit', id)
    },
    /**
     * 设置比赛进度
     * @param id
     */
    toSetProgress (id) {
      this.$emit('toSetProgress', id)
    },
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
    }
  }
}
</script>

<style>
  .ivu-table .table-info-primary td{
    background-color: #2db7f5 !important;
    color: #fff;
  }
  .ivu-table .table-info-warning td{
    background-color: #ffe70c !important;
    color: #14161d;
  }
  .ivu-table .table-info-success td {
    background-color: #187 !important;
    color: #fff;
  }
</style>
