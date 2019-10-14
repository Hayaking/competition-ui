<template>
  <div>
    <Table :columns="tb_head" :data="competitionData" />
    {{competition}}
    {{budgets}}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      getter: this.$store.getters,
      rules: {
        startDate: [{ required: true, message: '不为空' }],
        enterDate: [{ required: true, message: '不为空' }],
        groupNum: [{ required: true, message: '不为空' }],
        stuNum: [{ required: true, message: '不为空' }],
        personInCharge: [{ required: true, message: '不为空' }],
        joinTypeId: [{ required: true, message: '不为空' }],
        process: [{ required: true, message: '不为空' }],
        intro: [{ required: true, message: '不为空' }]
      },
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
      tb_head1: [
        {
          title: 'groupId',
          key: 'groupId',
          width: 100,
          fixed: 'left'
        }, {
          title: 'name',
          key: 'name'
        }, {
          title: 'place',
          key: 'place'
        }, {
          title: 'org',
          key: 'org'
        }, {
          title: 'coOrg',
          key: 'coOrg'
        }, {
          title: 'minLevelId',
          key: 'minLevelId'
        }, {
          title: 'maxLevelId',
          key: 'maxLevelId'
        }, {
          title: 'teacherGroupId',
          key: 'teacherGroupId'
        }, {
          title: 'enterDate',
          key: 'enterDate'
        }, {
          title: 'groupNum',
          key: 'groupNum'
        }, {
          title: 'stuNum',
          key: 'stuNum'
        }, {
          title: 'personInCharge',
          key: 'personInCharge'
        }, {
          title: 'joinTypeId',
          key: 'joinTypeId'
        }, {
          title: 'process',
          key: 'process'
        }, {
          title: 'intro',
          key: 'intro'
        }, {
          title: 'startTime',
          key: 'startTime'
        }, {
          title: 'endTime',
          key: 'endTime'
        }, {
          title: 'enterStartTime',
          key: 'enterStartTime'
        }, {
          title: 'enterEndTime',
          key: 'enterEndTime'
        }]
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
      'handleGetType'
    ]),
    submit () {
      // budgets数组直接穿过去会undefined
      let res = { flag: true, budgets: this.budgets }
      this.$emit('on-success-valid', res)
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
    }
  },
  computed: {
    competitionData () {
      let data = []
      for (let key in this.competition) {
        data.push({ 'field': key, 'val': this.competition[key] })
      }
      return data
    }
  },
  watch: {
    flag (newVal) {
      if (newVal) {
        this.submit()
      }
    }
  }
}
</script>

<style scoped>

</style>
