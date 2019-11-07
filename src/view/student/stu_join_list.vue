<template>
  <Card>
    <ResultModal :show="isShowResultModal"
                 :id = "joinInProcessId"
                @cancel="cancel"/>
    <EditJoinModal :show="isShowJoinModal"
               @cancel="cancel"/>
    <div slot="title">
      <Input search
             style="width: 300px"/>
      <Button type="primary" @click="toJoin">添加参赛</Button>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           border
           stripe>
      <template slot-scope="{ row, index }" slot="competition">
        <div>{{row.competition.name}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="teacher1">
        <div v-if="row.teacher1 === null">无</div>
        <Row v-else>
          <Col span="12">
            {{row.teacher1.teacherName}}
          </Col>
          <Col span="12">
            <Tag color="primary">{{row.applyState}}</Tag>
          </Col>
        </Row>
      </template>
      <template slot-scope="{ row, index }" slot="teacher2">
        <div v-if="row.teacher2 === null">无</div>
        <Row v-else>
          <Col span="12">
            {{row.teacher2.teacherName}}
          </Col>
          <Col span="12">
            <Tag color="primary">{{row.applyState}}</Tag>
          </Col>
        </Row>
      </template>
      <template slot-scope="{ row, index }" slot="type">
        <div>{{row.competition.joinTypeId}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="showEditJoinModal(row)">
          编辑
        </Button>
        <Button type="error" size="small" @click="deleteJoin(row)">
          删除
        </Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.size"
          @on-change = "pageChange"
    />
  </Card>
</template>

<script>
import EditJoinModal from '@/view/components/modal/join-edit_modal'
import ResultModal from '@/view/student/components/modal/submit-result-modal'
import { mapActions } from 'vuex'
import JoinExpand from '@/view/student/components/table-expand/join-expand'
export default {
  name: 'stu_join_list',
  components: { EditJoinModal, JoinExpand, ResultModal },
  data () {
    return {
      TABLE_HEAD: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(JoinExpand, {
              props: {
                row: params.row
              },
              on: {
                showResult: (id) => {
                  console.info(id)
                  this.showResultModal(id)
                }
              }
            })
          }
        },
        {
          title: '比赛名',
          slot: 'competition'
        },
        {
          title: '作品名',
          slot: 'works'
        },
        {
          title: '指导老师1',
          slot: 'teacher1'
        },
        {
          title: '指导老师2',
          slot: 'teacher2'
        },
        {
          title: '报名状态',
          key: 'enterState'
        },
        {
          title: '参赛状态',
          key: 'joinState'
        },
        {
          title: '参赛类型',
          slot: 'type'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      page: {
        current: 1,
        size: 12,
        total: 0,
        records: []
      },
      isShowJoinModal: false,
      isShowResultModal: false,
      joinInProcessId: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getJoin()
    })
  },
  methods: {
    ...mapActions([
      'handleGetJoinList',
      'handleDeleteJoin'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getJoin(index, this.page.size)
    },
    /**
       * 分页获取学生或教师
       */
    getJoin (pageNum = 1, pageSize = 12) {
      this.handleGetJoinList({ pageNum, pageSize }).then(res => {
        this.page = res
      })
    },
    showEditJoinModal (obj) {
      this.isShowJoinModal = true
      this.$store.commit('setEditJoin', obj)
    },
    deleteJoin (obj) {
      let id = obj.id
      this.handleDeleteJoin({ id }).then(res => {
        if (res) {
          this.getJoin()
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    showResultModal (id) {
      this.joinInProcessId = id
      this.isShowResultModal = true
    },
    cancel () {
      this.isShowJoinModal = false
      this.isShowResultModal = false
    },
    toJoin () {
      this.$router.push({ name: 'common_competition' })
    }
  }
}
</script>

<style scoped>

</style>
