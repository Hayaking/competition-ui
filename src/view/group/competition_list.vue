<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="3">
          <Select v-model="groupId">
            <Option  v-for="(item,index) in groupList"
                     :key="index"
                     :value="item.id">
              {{item.name}}
            </Option>
          </Select>
        </Col>
        <Col span="5">
          <Input class="tool-bar"
                 search/>
        </Col>
        <Col span="5">
          <Button @click="addCompetition" type="primary">增加</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           border
           stripe>
      <!--报名状态-->
      <template slot="enterState" slot-scope="{ row, index }">
        <Button :type="type(row.enterState)"
                size="small">
          {{row.enterState}}
        </Button>
      </template>
      <!--比赛开始状态-->
      <template slot="startState" slot-scope="{ row, index }">
        <Button :type="type(row.startState)"
                size="small">
          {{row.startState}}
        </Button>
      </template>
      <!--比赛审核状态-->
      <template slot="state" slot-scope="{ row, index }">
        <tag color="success" v-if="row.state === 1">审核通过</tag>
        <tag color="primary" v-else-if="row.state === 0">未审核</tag>
        <tag color="error" v-else-if="row.state === -1">未通过审核</tag>
      </template>
      <template slot="actions" slot-scope="{ row, index }">
        <Dropdown trigger="click" @on-click="handleClick">
          <a>操作<Icon type="ios-arrow-down" /></a>
          <DropdownMenu slot="list">
            <DropdownItem :name='"showEnterList(" + row.id + ")"'>查看报名列表</DropdownItem>
            <DropdownItem :name='"showResult(" + row.id + ")"'>查看比赛结果</DropdownItem>
            <DropdownItem :name='"showProcess(" + row.id + ")"'>提交比赛过程</DropdownItem>
            <DropdownItem :name='"showEditCompetitionModal(" + row.id + ")"'>编辑比赛信息</DropdownItem>
            <DropdownItem :name='"setProgress(" + row.id + ")"'>编辑比赛进度</DropdownItem>
            <DropdownItem :nmae='"toDelete(" + row.id + ")"'>删除</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </Table>
    <Page :current="page.current"
          :page-size="page.page_size"
          :total="page.total"
          @on-change="pageChange"
          show-total
    />
    <!--提交比赛过程-->
    <SubmitProcessModal
      :processHolder="processHolder"
      :showModal="showProcessModal"
      :competitionType="COMPETITION_TYPE"
      @cancel="cancelModel"
    />
    <!--編輯信息-->
    <EditCompetitionModal
      :show="showEditModal"
      @cancel="cancelModel"/>
    <!--设置比赛进程-->
    <SetProgressModal
      :show="showProgressModal"
      :progressHolder="progressHolder"
      :competitionType="COMPETITION_TYPE"
      @cancel="cancelModel"
    />
    <SubmitResultModal
      :show="showResultModal"
      :resultHolder="resultHolder"
      @cancel="cancelModel"
    />
  </Card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SubmitProcessModal from '@/view/group/components/modal/submit-process-modal'
import CompetitionExpand from '@/view/group/components/expand/competition-expand'
import EditCompetitionModal from '@/view/group/components/modal/edit-modal'
import SetProgressModal from '@/view/group/components/modal/edit-progress-modal'
import SubmitResultModal from '@/view/group/components/modal/submit-result-modal'

export default {
  name: 'group_competition_list',
  components: { SubmitProcessModal, CompetitionExpand, EditCompetitionModal, SetProgressModal, SubmitResultModal },
  data () {
    return {
      COMPETITION_TYPE: [],
      TABLE_HEAD: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(CompetitionExpand, {
              props: {
                row: params.row,
                flag: this.flag
              }
            })
          }
        },
        {
          title: 'id',
          key: 'id',
          width: 100,
          sortable: true
        },
        {
          title: '竞赛名',
          key: 'name',
          align: 'center',
          width: 200
        },
        {
          title: '简介',
          key: 'intro'
        },
        {
          title: '审核状态',
          align: 'center',
          slot: 'state',
          filters: [
            {
              label: '通过',
              value: 1
            },
            {
              label: '申请中',
              value: 2
            },
            {
              label: '拒绝',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.state === '通过'
            } else if (value === 2) {
              return row.state === '申请中'
            } else {
              return row.state === '拒绝'
            }
          }
        },
        {
          title: '操作',
          align: 'center',
          slot: 'actions'
        }
      ],
      groupList: [],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      },
      showProcessModal: false,
      showEditModal: false,
      showProgressModal: false,
      showResultModal: false,
      competitionId: 0,
      flag: false,
      groupId: 0,
      progressHolder: {
        competitionId: 0
      },
      processHolder: {
        competitionId: 0
      },
      resultHolder: {
        competitionId: 0
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
      // 获取该老师属于的工作组
      this.handleGetTeacherGroupList().then(res => {
        this.groupList = res
        if (Object.keys(this.group).length === 0) {
          this.group = res[0]
          this.groupId = res[0].id
        } else {
          this.groupId = this.group.id
        }
      }).then(() => {
        this.getCompetitionList()
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetCompetitionPageByGroupId',
      'handleSetEnterState',
      'handleGetTeacherGroupList',
      'handleGetType',
      'handleDeleteCompetition'
    ]),
    ...mapMutations([
      'closeTag',
      'setTeacherGroupForCompetitionList',
      'setEnterListCompetition',
      'setResultListCompetition',
      'setCreateCompetition'
    ]),
    /**
       * 分页
       * @param index
       */
    pageChange (index) {
      this.page.current = index
      this.getCompetitionList(index, this.page.size)
    },
    /**
       * 获取竞赛
       */
    getCompetitionList (pageNum = 1, pageSize = 12) {
      this.handleGetCompetitionPageByGroupId({ pageNum, pageSize, groupId: this.groupId }).then(res => {
        this.page = res
      })
    },
    /**
       * 获取竞赛级别
       */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    },
    deleteCompetition (competitionId) {
      this.handleDeleteCompetition({ id: competitionId }).then(res => {
        if (res) {
          this.getCompetitionList()
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 创建比赛立项
     */
    addCompetition () {
      this.$router.push({
        name: 'group_competition',
        params: {
          id: this.groupId
        }
      })
    },
    /**
     * 显示编辑对话框
     * @param competitionId
     */
    showEditCompetitionModal (competitionId) {
      let competition = this.page.records.find(item => {
        return item.id === competitionId
      })
      this.setCreateCompetition(competition)
      this.showEditModal = true
    },
    showProcess (competitionId) {
      this.showProcessModal = true
      this.processHolder.competitionId = competitionId
    },
    /**
     * 前往比赛结果页
     * @param competitionId
     */
    showResult (competitionId) {
      this.setResultListCompetition(this.page.records.find(item => {
        return item.id === competitionId
      }))
      this.$router.push({ name: 'group_result_list' })
    },
    /**
     * 前往报名列表
     * @param competitionId
     */
    showEnterList (competitionId) {
      this.setEnterListCompetition(this.page.records.find(item => {
        return item.id === competitionId
      }))
      this.$router.push({ name: 'competition_enter_list' })
    },
    /**
     * 设置比赛进度
     * @param competitionId
     */
    setProgress (competitionId) {
      this.showProgressModal = true
      this.progressHolder.competitionId = competitionId
    },
    /**
     * 返回Button的type
     * @param state
     * @returns {string}
     */
    type (state) {
      if (state === '通过' || state === '已开始') {
        return 'success'
      } else if (state === '申请中' || state === '未开始') {
        return 'primary'
      } else {
        return 'error'
      }
    },
    cancelModel () {
      this.showProcessModal = false
      this.showEditModal = false
      this.showProgressModal = false
      this.showResultModal = false
    },
    handleClick (name) {
      // eslint-disable-next-line no-eval
      eval('this.' + name)
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroupForCompetitionList'
    ]),
    group: {
      set (val) {
        this.setTeacherGroupForCompetitionList(val)
      },
      get () {
        return this.getTeacherGroupForCompetitionList
      }
    }
  },
  watch: {
    groupId: {
      handler (newVal) {
        // this.group = this.groupList.find(item => {
        //   return item.id === newVal
        // })
        this.getCompetitionList()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
