<template>
  <Card>
    <!--工具栏-->
    <div slot="title">
      <Row>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="3">
          <Button @click="showCreate" type="primary">创建工作组</Button>
        </Col>
      </Row>
    </div>
    <!--内容-->
    <div>
      <Table :columns="tb_head" :data="tb_res" stripe>
        <template slot-scope="{ row, index }" slot="creator">
          <div>{{row.creator.teacherName}}</div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="showCompetition(row.id)">
            查看比赛立项
          </Button>
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :disabled="isDisabled(row.creator.teacherName)"
                  @click="showInvite(row.id)">
            邀请组员
          </Button>
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :disabled="isDisabled(row.creator.teacherName)"
                  @click="showInvite(row.id)">
            提交比赛过程
          </Button>
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :disabled="isDisabled(row.creator.teacherName)"
                  @click="toPost()">
            发表公告
          </Button>
          <Button type="error"
                  size="small"
                  style="margin-right: 5px"
                  @click="exit(row.id)">
            退出
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
    <!--工作组拥有的竞赛-->
    <CompetitionModal
      :show="showCompetitionModal"
      :current-group-id="groupId"
      @cancel="closeModel"
    />
    <!--创建工作组-->
    <CreateModal
      :show="showCreateModal"
      @cancel="closeModel"
    />
  </Card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import InviteModal from '@/view/components/modal/group-invite-modal'
import CompetitionModal from '@/view/components/modal/group-competition-modal'
import CreateModal from '@/view/components/modal/group-create-modal'
import { sleep } from '@/libs/util'

export default {
  name: 'test',
  components: { InviteModal, CompetitionModal, CreateModal },
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
      tb_res: [],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      },
      showInviteModal: false,
      showCompetitionModal: false,
      showCreateModal: false,
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
      'handleExitTeacherGroup'
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
        this.tb_res = res.records
      })
    },
    exit (groupId) {
      this.handleExitTeacherGroup({ groupId }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    closeModel () {
      this.showInviteModal = false
      this.showCompetitionModal = false
      this.showCreateModal = false
    },
    showInvite (id) {
      this.groupId = id
      this.showInviteModal = true
    },
    showCompetition (id) {
      // this.groupId = id
      // this.showCompetitionModal = true
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
            id: id
          }
        })
        this.preGroupId = id
      })
    },
    showCreate () {
      this.showCreateModal = true
    },
    isDisabled (creatorName) {
      return !(this.userName === creatorName)
    },
    toPost () {
      this.$router.push({ name: 'group_post' })
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
