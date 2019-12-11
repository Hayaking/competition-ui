<template>
  <div>
    <div v-for="(item,index) in list" :key="index">
      {{item.stuName}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'works',
  props: { id: { Number } },
  data () {
    return {
      list: ''
    }
  },
  methods: {
    ...mapActions([
      'handleGetStudentGroupMemberList'
    ])
  },
  watch: {
    id: {
      handler (val) {
        this.handleGetStudentGroupMemberList({ groupId: val }).then(res => {
          this.list = res.body
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
