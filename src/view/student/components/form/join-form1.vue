<template>
    <div>
      <div>比赛名称：{{competition.name}}</div>
      <div>负责人：{{competition.personInCharge.teacherName}}</div>
      <div>负责人：{{competition.progressList[0].name}}</div>
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
      let isSingle = this.competition.progressList[0].isSingle
      let isNeedWorks = this.competition.progressList[0].isNeedWorks
      this.$emit('call-back', isSingle, isNeedWorks)
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
