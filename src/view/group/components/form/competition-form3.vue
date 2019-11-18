<template>
  <div>
    <Card title="竞赛信息" icon="ios-options" :padding="0" shadow >
      <CellGroup>
        <Row>
          <Col span="12">
            <Cell>
              <div slot="icon">比赛名称：</div>
              <div slot="label">{{competition.name}}</div>
            </Cell>
          </Col>
          <Col span="12">
            <Cell>
              <div slot="icon">负责人：</div>
              <div slot="label">{{competition.personInChargeId}}</div>
            </Cell>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Cell>
              <div slot="icon">预期参赛队数：</div>
              <div slot="label">{{competition.exGroupNum}}</div>
            </Cell>
          </Col>
          <Col span="8">
            <Cell>
              <div slot="icon">预期参赛人数：</div>
              <div slot="label">{{competition.exStuNum}}</div>
            </Cell>
          </Col>
          <Col span="8">
            <Cell>
              <div slot="icon">预设奖项：</div>
              <div slot="label">{{competition.prePrice}}</div>
            </Cell>
          </Col>
        </Row>
        <Cell>
          <div slot="icon">比赛介绍：</div>
          <div slot="label">{{competition.intro}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛条件：</div>
          <div slot="label">{{competition.exCondition}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛过程：</div>
          <div slot="label">{{competition.process}}</div>
        </Cell>
        <Cell>
          <div slot="icon">预期结果：</div>
          <div slot="label">{{competition.exRes}}</div>
        </Cell>
      </CellGroup>
    </Card>
    <Table :columns="tb_head2" :data="budgets" size="small">
      <template slot-scope="{ row, index }" slot="typeName">
        {{COMPETITION_TYPE[row.typeId].typeName}}
      </template>
    </Table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { dateFomat } from '@/libs/tools'
export default {
  name: 'competition-form1',
  data () {
    return {
      COMPETITION_TYPE: [],
      tb_head2: [
        {
          title: '阶段',
          slot: 'typeName'
        },
        {
          title: '报名费',
          key: 'enter'
        },
        {
          title: '差旅费',
          key: 'travel'
        },
        {
          title: '材料费',
          key: 'thing'
        },
        {
          title: '原因',
          key: 'reason'
        },
        {
          title: '其它',
          key: 'other'
        }
      ]
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleSaveCompetition',
      'handleSaveCompetitionHolder',
      'handleSaveBudgets'
    ]),
    save () {
      let competitionHolder = {
        competition: this.competition,
        progresses: this.progresses,
        budgets: this.budgets
      }
      this.handleSaveCompetitionHolder({ competitionHolder }).then(res => {
        res
          ? this.$Message.success('保存成功')
          : this.$Message.error('保存失败')
        this.$emit('callback', res)
      })
    },
    fomatDate (date) {
      return dateFomat(date)
    }
  },
  computed: {
    ...mapGetters([
      'getCreateCompetition',
      'getFormList'
    ]),
    competition: {
      get () {
        return this.getCreateCompetition
      },
      set (val) {

      }
    },
    budgets () {
      return this.getFormList.map(item => {
        return {
          typeId: item.typeId,
          enter: item.enter,
          travel: item.travel,
          thing: item.thing,
          other: item.other,
          reason: item.reason
        }
      })
    },
    progresses () {
      return this.getFormList.map(item => {
        return {
          typeId: item.typeId,
          competitionId: 0,
          startTime: item.startDate[0],
          endTime: item.startDate[1],
          enterStartTime: item.enterDate[0],
          enterEndTime: item.enterDate[1]
        }
      })
    }
  },
  watch: {
    flag (newVal) {
      if (newVal) {
        this.save()
      }
    }
  }
}
</script>

<style scoped>

</style>
