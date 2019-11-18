<template>
  <div>
      <Button @click="downloadApply"
              style="margin-right: 5px"
              type="primary"
              size="small">
        下载申请表
      </Button>
      <Button @click="downloadBudget"
              type="primary"
              size="small">
        下载预算表
      </Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'admin-competition-expand',
  props: {
    row: Object
  },
  methods: {
    ...mapActions([
      'handleDownloadCompetitionWord',
      'handleDownloadCompetitionBudgetWord'
    ]),
    downloadApply () {
      this.handleDownloadCompetitionWord({ competitionId: this.row.id }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    downloadBudget () {
      this.handleDownloadCompetitionBudgetWord({ competitionId: this.row.id }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
