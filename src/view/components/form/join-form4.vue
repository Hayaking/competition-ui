<template>
    <div>
      <Input search enter-button="搜索" />
      <Table :columns="tb_head" :data="tb_res" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'join-form4',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleGetLeadTeacherList().then(res => {
        this.tb_res = res.map(item => {
          item.state = true
          return item
        })
        this.index++
      })
    })
  },
  data () {
    return {
      tb_res: [],
      tb_head: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return params.row.state ? h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: false
              },
              on: {
                click: () => {
                  this.inviteLead(params.row._index)
                }
              }
            }, '申请')
              : h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.cancelInviteLead(params.row._index)
                  }
                }
              }, '取消')
          }
        }
      ],
      join: {
        competitionId: 0,
        teacherId1: 0,
        teacherId2: 0
      }
    }
  },
  methods: {
    ...mapActions([
      'handleGetLeadTeacherList'
    ]),
    submit () {
      this.$emit('on-success-valid', true,this.join)
    },
    inviteLead (_index) {
      this.tb_res[_index].state = false
      this.join.teacherId1 = this.tb_res[_index].account
    },
    cancelInviteLead (_index) {
      this.tb_res[_index].state = true
      this.join.teacherId1 = 0
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
