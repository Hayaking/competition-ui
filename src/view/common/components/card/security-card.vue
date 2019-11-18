<template>
  <Card title="安全设置">
    <Form label-width="70"
          label-position="left">
      <FormItem label="密码：">
        <Input/>
      </FormItem>
      <FormItem label="银行卡号：">
        <Input/>
      </FormItem>
      <FormItem label="电话：">
        <Input/>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'info-card',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateStudentSecurityInfo'
    ]),
    save () {
      this.handleUpdateStudentSecurityInfo({ student: this.user }).then(res => {
        if (res) {
          this.$Message.success('成功')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  watch: {
    getUserInfo: {
      handler (val) {
        this.user = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
