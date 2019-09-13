<template>
  <Modal
    title="编辑"
    @on-ok="saveStudent"
    @on-cancel="cancel"
    v-model="modalShow">
    <Form :model="user" label-position="left" :label-width="70">
      <FormItem label="id">
        <Input v-model="user.id"/>
      </FormItem>
      <FormItem label="账号">
        <Input v-model="user.account"/>
      </FormItem>
      <FormItem label="密码">
        <Input v-model="user.password"/>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="user.stuName"/>
      </FormItem>
      <FormItem label="性别">
        <Input v-model="user.stuSex"/>
      </FormItem>
      <FormItem label="班级">
        <Input v-model="user.stuClass"/>
      </FormItem>
      <FormItem label="电话">
        <Input v-model="user.stuPhone"/>
      </FormItem>
      <FormItem label="银行卡号">
        <Input v-model="user.stuBankCardNo"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'stu-info-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getter: this.$store.getters
    }
  },
  methods: {
    ...mapActions([
      'handleSaveStudent'
    ]),
    /**
       * 保存学生
       */
    saveStudent () {
      this.handleSaveStudent({ student: this.user }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
        this.student = {}
      })
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    },
    user: {
      get () {
        return this.getter.getEditUser
      },
      set (val) {
        this.$store.commit('setEditUser', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
