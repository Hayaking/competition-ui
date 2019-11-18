<template>
  <Card title="基本设置">
    <Form :model="user"
          label-width="70"
          label-position="left">
      <FormItem label="姓名：">
        <Input v-model="user.stuName"/>
      </FormItem>
      <FormItem label="班级：">
        <Input v-model="user.stuClass"/>
      </FormItem>
      <FormItem label="性别：">
        <Input v-model="user.stuSex"/>
      </FormItem>
      <FormItem label="头像：">
        <Avatar />
      </FormItem>
    </Form>
    <Button @click="save">保存</Button>
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
      'handleUpdateStudentInfo'
    ]),
    save () {
      this.handleUpdateStudentInfo({ student: this.user }).then(res => {
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
