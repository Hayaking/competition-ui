<template>
  <Modal
    @on-cancel="cancel"
    :footer-hide="true"
    :fullscreen="fullscreen"
    width="800"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="3"><h2>查看比赛立项</h2></Col>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </Row>
    </div>
    <Table :columns="tb_head" :data="tb_res" stripe border ></Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'group-invite-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    currentGroupId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      competition: {
        name: '',
        startTime: '',
        org: '',
        personInCharge: '',
        type: ''
      },
      fullscreen: false,
      competitionType: [],
      groupList: [],
      tb_head: [
        {
          title: 'id',
          key: 'id',
          width: 100,
          fixed: 'left'
        }, {
          title: '竞赛名',
          key: 'name',
          width: 200,
          fixed: 'left'
        }, {
          title: '开始时间',
          key: 'startTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.startTime))
          }
        }, {
          title: '结束时间',
          key: 'endTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.endTime))
          }
        }, {
          title: '报名开始时间',
          key: 'enterStartTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.enterStartTime))
          }
        }, {
          title: '报名结束时间',
          key: 'enterEndTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.enterEndTime))
          }
        }, {
          title: '主办方',
          key: 'org',
          width: 100
        }, {
          title: '竞赛级别',
          key: 'type',
          width: 100
        }, {
          title: '审核状态',
          key: 'state',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.state === '申请中' ? 'default' : params.row.state === '通过' ? 'success' : 'error'
              }
            }, params.row.state)
          }
        }, {
          title: '报名状态',
          key: 'enterState',
          width: 100,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.enterState === '已开始' ? 'success' : params.row.enterState === '结束' ? 'error' : 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.setEnterState(params.row.id, params.row.enterState !== '已开始')
                }
              }
            }, params.row.enterState)
          }
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setEnterState(params.row.id, true)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.deleteCompetition(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_res: [],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    ...mapActions([
      'handleGetByGroupId',
      'handleSetEnterState',
      'handleGetTeacherGroup',
      'handleGetType',
      'handleDeleteCompetition'
    ]),
    full () {
      this.fullscreen = !this.fullscreen
    },
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    /**
     * 获取竞赛
     */
    getApply (pageNum = 1, pageSize = 12) {
      let groupId = this.currentGroupId
      this.handleGetByGroupId({ pageNum, pageSize, groupId }).then(res => {
        this.page = res
        this.tb_res = res.records
        this.tb_res.map((item) => {
          item.type = this.competitionType[item.typeId - 1].typeName
        })
      })
    },
    /**
     * 设置报名状态
     * @param id
     * @param flag
     */
    setEnterState (id, flag) {
      this.handleSetEnterState({ id, flag }).then(res => {
        if (res) {
          this.getApply()
        }
      })
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        if (res) {
          this.competitionType = this.getter.getCompetitionType
        } else {
          this.$Message.error('获取竞赛类型失败')
        }
      })
    },
    deleteCompetition (id) {
      this.$Message.info('删除' + id)
      this.handleDeleteCompetition({ id: id }).then(res => {
        if (res) {
          this.getApply()
          this.$Message.success('删除成功')
        }
      })
    },
    editCompetition () {

    }
  },
  computed: {
    modalShow: {
      get () {
        // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-side-effects-in-computed-properties
        this.$store.dispatch('handleGetRoleList').then(res => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.right = res
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.left = this.userRoles
        })
        return this.show
      },
      set (val) {
        console.info(val)
      }
    }
  },
  watch: {
    currentGroupId () {
      this.getApply()
    }
  }
}
</script>

<style scoped>

</style>
