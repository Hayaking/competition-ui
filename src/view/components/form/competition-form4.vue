<template>
  <div>
    <Card title="竞赛信息" icon="ios-options" :padding="0" shadow >
      <CellGroup>
        <Cell>
          <div slot="icon">工作组</div>
          <div slot="label">{{competition.teacherGroupId}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛名称</div>
          <div slot="label">{{competition.name}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛地点</div>
          <div slot="label">{{competition.place}}</div>
        </Cell>
        <Cell>
          <div slot="icon">主办方</div>
          <div slot="label">{{competition.org}}</div>
        </Cell>
        <Cell>
          <div slot="icon">协办方</div>
          <div slot="label">{{competition.coOrg}}</div>
        </Cell>
        <Cell>
          <div slot="icon">最低级别</div>
          <div slot="label">{{competition.minLevelId}}</div>
        </Cell>
        <Cell>
          <div slot="icon">最高级别</div>
          <div slot="label">{{competition.maxLevelId}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛开始时间</div>
          <div slot="label">{{competition.startTime}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛结束时间</div>
          <div slot="label">{{competition.endTime}}</div>
        </Cell>
        <Cell>
          <div slot="icon">报名开始时间</div>
          <div slot="label">{{competition.enterStartTime}}</div>
        </Cell>
        <Cell>
          <div slot="icon">报名结束时间</div>
          <div slot="label">{{competition.enterEndTime}}</div>
        </Cell>
        <Cell>
          <div slot="icon">负责人</div>
          <div slot="label">{{competition.personInCharge}}</div>
        </Cell>
        <Cell>
          <div slot="icon">参赛形式</div>
          <div slot="label">{{competition.joinTypeId}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛过程</div>
          <div slot="label">{{competition.process}}</div>
        </Cell>
        <Cell>
          <div slot="icon">比赛介绍</div>
          <div slot="label">{{competition.intro}}</div>
        </Cell>
      </CellGroup>
    </Card>
    <Table :columns="tb_head2" :data="budgets" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      COMPETITION_TYPE: [],
      JOIN_TYPE: ['单人赛', '多人赛'],
      tb_head: [
        {
          title: '属性',
          key: 'field'
        }, {
          title: '值',
          key: 'val'
        }
      ],
      tb_head2: [
        {
          title: '阶段',
          key: 'typeId'
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
    },
    competition: {
      type: Object
    },
    budgets: {
      type: Array
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleSaveCompetition',
      'handleSaveBudgets'
    ]),
    submit () {
      // budgets数组直接传过去会undefined
      // let res = { flag: true, budgets: this.budgets }
      // this.$emit('on-success-valid', res)
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    },
    save () {
      this.handleSaveCompetition({ competition: this.competition }).then(res => {
        if (res.flag) {
          this.budgets = this.budgets.map(item => {
            item.competitionId = res.body
            return item
          })
          this.handleSaveBudgets({ budgets: this.budgets }).then(res => {
            res
              ? this.$Message.success('保存成功')
              : this.$Message.error('保存失败')
            this.$emit('callback', res)
          })
        } else {
          this.$Message.error('保存失败')
        }
      })
    }
  },
  computed: {
    competitionData () {
      let data = []
      for (let key in this.competition) {
        data.push({
          'field': key,
          'val': this.competition[key]
        })
      }
      return data
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
