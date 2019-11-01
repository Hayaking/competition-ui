<template>
  <div>
    <PageHeader />
    <Row>
      <Col span="15">
        <GroupCard :group="currentGroup" />
        <CompetitionCard :group="currentGroup"/>
        <Card title="动态"></Card>
      </Col>
      <Col span="8" offset="1">
        <ActionCard :groupList="page.records"
                    :group="currentGroup"
                    @callInvite="showInvite"
                    @callCreateCompetition="showCreateGroup"
                    @selectChanged="selectChanged"
        />
        <GroupMemberCard :group="currentGroup" />
      </Col>
    </Row>
    <!--邀请组员-->
    <InviteModal
      :show="showInviteModal"
      :group-id="currentGroup.id"
      @cancel="closeModel"
    />
    <!--创建工作组-->
    <CreateModal
      :show="showCreateModal"
      @callback="handleCreateGroup"
      @cancel="closeModel"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import InviteModal from '@/view/group/components/modal/invite-modal'
import CreateModal from '@/view/group/components/modal/create-modal'
import PageHeader from '@/view/group/components/header/PageHeader'
import ActionCard from '@/view/group/components/card/action-card'
import GroupCard from '@/view/group/components/card/group-card'
import CompetitionCard from '@/view/group/components/card/competition-card'
import GroupMemberCard from '@/view/group/components/card/group-member-card'
export default {
  name: 'list',
  components: { InviteModal, CreateModal, PageHeader, ActionCard, GroupCard, CompetitionCard, GroupMemberCard },
  data () {
    return {
      getter: this.$store.getters,
      key: '',
      tb_head: [
        {
          title: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '名称',
          key: 'name',
          width: 100
        },
        {
          title: '创建者',
          slot: 'creator',
          width: 100
        },
        {
          title: '申请时间',
          key: 'createTime',
          width: 150
        },
        {
          title: '状态',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.state === '通过' ? 'success' : params.row.state === '申请中' ? 'default' : 'error'
              }
            }, params.row.state)
          }
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      },
      showInviteModal: false,
      showCreateModal: false,
      showProcessModal: false,
      groupId: 0,
      preGroupId: 0,
      currentGroup: {},
      competitionList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getApply()
    })
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    ...mapActions([
      'handleGetTeacherGroupByPage',
      'handleSetTeacherGroupState',
      'handleSearchTeacherGroup',
      'handleExitTeacherGroup',
      'handleDeleteTeacherGroup'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetTeacherGroupByPage({ pageNum, pageSize }).then(res => {
        this.page = res
        this.currentGroup = res.records[0]
      })
    },
    /**
     * 退出工作组
     * @param groupId
     */
    exitGroup (groupId) {
      this.handleExitTeacherGroup({ groupId }).then(res => {
        if (res) {
          this.getApply()
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 删除工作组
     * @param groupId
     */
    deleteGroup (groupId) {
      this.handleDeleteTeacherGroup({ groupId }).then(res => {
        if (res) {
          this.getApply()
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 关闭对话框
     */
    closeModel () {
      this.showInviteModal = false
      this.showCreateModal = false
    },
    showInvite (id) {
      this.groupId = id
      this.showInviteModal = true
    },
    showCreateGroup () {
      this.showCreateModal = true
    },
    isNotGroupCreator (creatorName) {
      return !(this.userName === creatorName)
    },
    handleCreateGroup (flag) {
      flag
        ? this.getApply()
        : this.$Message.error('失败')
    },
    selectChanged (id) {
      this.currentGroup = this.page.records.find(item => {
        return item.id === id
      })
    }
  },
  computed: {
    userName: {
      get () {
        return this.getter.getUserInfo.teacherName
      }
    }
  }
}
</script>

<style scoped>

</style>
