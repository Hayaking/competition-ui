<template>
    <div>
      <div>比赛名称：{{competition.name}}</div>
      <div>开始时间：{{competition.startTime}}</div>
      <div>结束时间：{{competition.endTime}}</div>
      <div>报名开始时间：{{competition.enterStartTime}}</div>
      <div>报名结束时间：{{competition.enterEndTime}}</div>
      <div>主办方：{{competition.org}}</div>
      <div>比赛地点：{{competition.place}}</div>
      <div>负责人：{{competition.personInCharge}}</div>
      <div>比赛最高级别：{{competition.highestLevel}}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'join-form1',
  data () {
    return {
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit () {
      this.$emit('on-success-valid', true)
    }
  },
  computed: {
    ...mapGetters([
      'getEnterCompetition'
    ]),
    competition () {
      return this.getEnterCompetition
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
