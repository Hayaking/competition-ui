<template>
  <div>
   {{person}}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'works',
  props: { id: { Number } },
  data () {
    return {
      person: {}
    }
  },
  methods: {
    ...mapActions([
      'handleGetStudentById'
    ])
  },
  watch: {
    id: {
      handler (val) {
        this.handleGetStudentById({ id: val }).then(res => {
          this.person = res.body
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
