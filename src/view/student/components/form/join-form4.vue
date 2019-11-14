<template>
    <div>
      <Input search enter-button="搜索" />
      <Table :columns="TABLE_HEAD" :data="tb_res" />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      TABLE_HEAD: [
        {
          title: '姓名',
          key: 'teacherName'
        },
        {
          title: '性别',
          key: 'teacherSex'
        },
        {
          title: '电话',
          key: 'teacherPhone'
        },
        {
          title: '擅长领域',
          key: 'teacherMaster'
        },
        {
          title: '职称',
          key: 'teacherLevel'
        },
        {
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
      counter: 0
    }
  },
  methods: {
    ...mapActions([
      'handleGetLeadTeacherList'
    ]),
    ...mapMutations([
      'setEnterHolderJoin'
    ]),
    submit () {
      this.$emit('on-success-valid', true)
    },
    inviteLead (_index) {
      this.tb_res[_index].state = false
      this.counter++
      this.counter === 1
        ? this.join.teacherId1 = this.tb_res[_index].id
        : this.join.teacherId2 = this.tb_res[_index].id
    },
    cancelInviteLead (_index) {
      this.tb_res[_index].state = true
      this.counter--
      this.counter === 1
        ? this.join.teacherId1 = this.tb_res[_index].id
        : this.join.teacherId2 = this.tb_res[_index].id
    }
  },
  computed: {
    ...mapGetters([
      'getEnterHolder'
    ]),
    join: {
      get () {
        return this.getEnterHolder.join
      },
      set (val) {
        this.setEnterHolderJoin(val)
      }
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
