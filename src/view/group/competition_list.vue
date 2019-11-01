<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="3">
          <Select v-model="groupId">
            <Option :key="item.id" :value="item.id" v-for="item in groupList">
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
        <Button :type="type(row.state)"
                @click="review(row.id,row.state !== '通过')"
                size="small">
          {{row.state}}
        </Button>
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
import { mapActions, mapMutations } from 'vuex'
import SubmitProcessModal from '@/view/group/components/modal/submit-process-modal'
import CompetitionExpand from '@/view/components/table-expand/group-competition-expand'
import EditCompetitionModal from '@/view/group/components/modal/edit-modal'
import SetProgressModal from '@/view/group/components/modal/submit-progress-modal'
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
              },
              on: {
                showProcess: (competitionId) => {
                  this.showProcess(competitionId)
                },
                showResult: (competitionId) => {
                  this.showResult(competitionId)
                },
                showEdit: (competitionId) => {
                  this.showEditCompetition(competitionId)
                },
                showEnterList: (competitionId) => {
                  this.showEnterList(competitionId)
                },
                toDelete: (competitionId) => {
                  this.deleteCompetition(competitionId)
                },
                toSetProgress: (competitionId) => {
                  this.setProgress(competitionId)
                }
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
          title: '主办方',
          key: 'org',
          align: 'center'
        },
        {
          title: '协办方',
          key: 'coOrg',
          align: 'center'
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
      tabs: [],
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
      this.groupId = this.$route.params.id
      this.flag = this.$route.params.flag
      this.getApply()
      this.getCompetitionType()
      // 获取该老师属于的工作组
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
        if (this.groupId === 0) {
          this.groupId = res[0].id
        }
      })
    })
  },
  beforeDestroy () {
    this.tabs.forEach(item => {
      this.closeTab(item)
    })
  },
  methods: {
    ...mapActions([
      'handleGetByGroupId',
      'handleSetEnterState',
      'handleGetTeacherGroup',
      'handleGetType',
      'handleDeleteCompetition'
    ]),
    ...mapMutations([
      'closeTag'
    ]),
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
      this.handleGetByGroupId({ pageNum, pageSize, groupId: this.groupId }).then(res => {
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
    deleteCompetition (id) {
      this.handleDeleteCompetition({ id: id }).then(res => {
        if (res) {
          this.getApply()
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
    showEditCompetition (id) {
      this.showEditModal = true
    },
    showProcess (id) {
      this.showProcessModal = true
      this.processHolder.competitionId = id
    },
    showResult (id) {
      this.showResultModal = true
      this.competitionId = id
    },
    showEnterList (competitionId) {
      console.info(competitionId)
      let tab = {
        name: 'competition_enter_list',
        params: {
          id: competitionId
        }
      }
      this.tabs.push(tab)
      this.$router.push(tab)
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
    closeTab (item) {
      this.closeTag(item)
    }
  },
  watch: {
    groupId () {
      this.getApply()
    }
  }
}
</script>

<style scoped>

</style>
