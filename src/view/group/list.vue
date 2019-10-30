<template>
  <Card>
    <!--工具栏-->
    <div slot="title">
      <Row>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="4">
          <Button @click="showCreateGroup" type="primary">创建工作组</Button>
          <Button @click="refresh" type="primary">刷新</Button>
        </Col>
      </Row>
    </div>
    <!--内容-->
    <div>
      <Table :columns="tb_head" :data="page.records" stripe>
        <template slot-scope="{ row, index }" slot="creator">
          <div>{{row.creator.teacherName}}</div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="toCompetitionList(row)">
            查看比赛立项
          </Button>
          <Button v-if="isNotGroupCreator(row.creator.teacherName)"
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="showInvite(row.id)">
            查看成员
          </Button>
          <Button v-else
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="showInvite(row.id)">
            邀请组员
          </Button>
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :disabled="isNotGroupCreator(row.creator.teacherName)"
                  @click="toPost()">
            发表公告
          </Button>
          <Button v-if="isNotGroupCreator(row.creator.teacherName)"
                  type="error"
                  size="small"
                  style="margin-right: 5px"
                  @click="exitGroup(row.id)">
            退出
          </Button>
          <Button
                  v-else
                  type="error"
                  size="small"
                  style="margin-right: 5px"
                  @click="deleteGroup(row.id)">
            删除
          </Button>
        </template>
      </Table>
      <Page :current="page.current"
            :page-size="page.page_size"
            :total="page.total"
            @on-change="pageChange"
            show-total
      />
    </div>
    <!--邀请组员-->
    <InviteModal
      :show="showInviteModal"
      :group-id="groupId"
      @cancel="closeModel"
    />
    <!--创建工作组-->
    <CreateModal
      :show="showCreateModal"
      @callback="handleCreateGroup"
      @cancel="closeModel"
    />
  </Card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import InviteModal from '@/view/group/components/modal/group/invite-modal'
import CreateModal from '@/view/group/components/modal/group/create-modal'
import { sleep } from '@/libs/util'

export default {
  name: 'list',
  components: { InviteModal, CreateModal },
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
      preGroupId: 0
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
    /**
       * 分页获取学生或教师
       */
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetTeacherGroupByPage({ pageNum, pageSize }).then(res => {
        this.page = res
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
    toCompetitionList (group) {
      let id = group.id
      let creatorName = group.creator.teacherName
      this.closeTag({
        name: 'group_competition_list',
        params: {
          id: this.preGroupId
        }
      })
      sleep(10).then(() => {
        this.$router.push({
          name: 'group_competition_list',
          params: {
            id: id,
            flag: this.isNotGroupCreator(creatorName)
          }
        })
        this.preGroupId = id
      })
    },
    showCreateGroup () {
      this.showCreateModal = true
    },
    isNotGroupCreator (creatorName) {
      return !(this.userName === creatorName)
    },
    toPost () {
      this.$router.push({ name: 'group_post' })
    },
    refresh () {
      this.getApply()
    },
    handleCreateGroup (flag) {
      flag
        ? this.getApply()
        : this.$Message.error('失败')
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
