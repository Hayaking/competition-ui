<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="3">
          <Select v-model="groupId">
            <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
              {{item.name}}
            </Option>
          </Select>
        </Col>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="5">
          <Button type="primary" @click="addCompetition">增加</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           stripe
           border >
      <!--报名状态-->
      <template slot-scope="{ row, index }" slot="enterState">
        <Button :type="type(row.enterState)"
                size="small">
          {{row.enterState}}
        </Button>
      </template>
      <!--比赛开始状态-->
      <template slot-scope="{ row, index }" slot="startState">
        <Button :type="type(row.startState)"
                size="small">
          {{row.startState}}
        </Button>
      </template>
      <!--比赛审核状态-->
      <template slot-scope="{ row, index }" slot="state">
        <Button :type="type(row.state)"
                size="small"
                @click="review(row.id,row.state !== '通过')">
          {{row.state}}
        </Button>
      </template>
      <!--竞赛级别-->
      <template slot-scope="{ row, index }" slot="level">
        {{level(row.minLevelId,row.maxLevelId)}}
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
    <!--提交比赛过程-->
    <SubmitProcessModal
      @cancel="cancelModel"
      :showModal="showProcessModal"
      :competitionId="competitionId"
    />
    <EditCompetitionModal
      @cancel="cancelModel"
      :show="showEditModal"/>
    <SetProgressModal
      @cancel="cancelModel"
      :show="showProgressModal"
    />
  </Card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import SubmitProcessModal from '@/view/components/modal/submit-process-modal'
import CompetitionExpand from '@/view/components/table-expand/group-competition-expand'
import EditCompetitionModal from '@/view/components/modal/group-edit-competition'
import SetProgressModal from '@/view/components/modal/group-set-competition-progress'
export default {
  name: 'group_competition_list',
  components: { SubmitProcessModal, CompetitionExpand, EditCompetitionModal, SetProgressModal },
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
                toDelete: (competitionId) => {
                  this.deleteCompetition(competitionId)
                },
                toEdit: (competitionId) => {
                  this.editCompetition(competitionId)
                },
                toSetProgress: (competitionId) => {
                  this.setProgress(competitionId)
                },
                toEnterList: (competitionId) => {
                  this.toEnterList(competitionId)
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
          title: '竞赛级别',
          align: 'center',
          slot: 'level'
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
          title: '报名状态',
          align: 'center',
          slot: 'enterState',
          filters: [
            {
              label: '已开始',
              value: 1
            },
            {
              label: '结束',
              value: 2
            },
            {
              label: '未开始',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.enterState === '已开始'
            } else if (value === 2) {
              return row.enterState === '结束'
            } else {
              return row.enterState === '未开始'
            }
          }
        },
        {
          title: '开始状态',
          align: 'center',
          slot: 'startState',
          filters: [
            {
              label: '已开始',
              value: 1
            },
            {
              label: '结束',
              value: 2
            },
            {
              label: '未开始',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.startState === '已开始'
            } else if (value === 2) {
              return row.startState === '结束'
            } else {
              return row.startState === '未开始'
            }
          }
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
      competitionId: 0,
      flag: false,
      groupId: 0,
      tabs: []
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
    console.info('closing')
    this.tabs.forEach(item => {
      console.info(item)
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
    editCompetition (id) {
      console.info('----------edit---------------')
      this.showEditModal = true
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
    showProcess (id) {
      this.showProcessModal = true
      this.competitionId = id
    },
    // 返回Button的type
    type (state) {
      if (state === '通过' || state === '已开始') {
        return 'success'
      } else if (state === '申请中' || state === '未开始') {
        return 'primary'
      } else {
        return 'error'
      }
    },
    // 返回竞赛级别
    level (minId, maxId) {
      if (maxId === undefined || minId === maxId) {
        return this.COMPETITION_TYPE[minId - 1].typeName
      } else {
        return this.COMPETITION_TYPE[minId - 1].typeName + '→' + this.COMPETITION_TYPE[maxId - 1].typeName
      }
    },
    cancelModel () {
      this.showProcessModal = false
      this.showEditModal = false
    },
    setProgress () {
      this.showProgressModal = true
    },
    toEnterList (competitionId) {
      let tab = {
        name: 'competition_enter_list',
        params: {
          id: competitionId
        }
      }
      this.tabs.push(tab)
      this.$router.push(tab)
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
