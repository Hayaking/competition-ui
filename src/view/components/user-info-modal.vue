<template>
  <Modal
    title="编辑"
    @on-ok="saveStudent"
    @on-cancel="cancel"
    v-model="modalShow">
    <Form :model="student" label-position="left" :label-width="70">
      <FormItem label="账号">
        <Input v-model="student.account" :disabled="true"/>
      </FormItem>
      <FormItem label="密码">
        <Input v-model="student.password"/>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="student.stuName"/>
      </FormItem>
      <FormItem label="性别">
        <Input v-model="student.stuSex"/>
      </FormItem>
      <FormItem label="班级">
        <Input v-model="student.stuClass"/>
      </FormItem>
      <FormItem label="电话">
        <Input v-model="student.stuPhone"/>
      </FormItem>
      <FormItem label="银行卡号">
        <Input v-model="student.stuBankCardNo"/>
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
    },
    stu: {
      type: Object
    }
  },
  data () {
    return {
      studentData: {}
    }
  },
  methods: {
    ...mapActions([
      'handleUpdate'
    ]),
    /**
       * 保存学生
       */
    saveStudent () {
      this.handleUpdate({ student: this.studentData }).then(res => {
        console.info(res)
        this.student = {}
      })
      this.$emit('ok')
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    student: {
      get () {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties,no-return-assign
        return this.studentData = Object.assign({}, this.stu)
      },
      set (val) {
        console.info(val)
        this.studentData = val
      }
    },
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
