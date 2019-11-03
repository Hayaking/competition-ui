<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="1">
          {{competition.name}}
        </Col>
        <Col span="3">
          <Select v-model="progressId">
            <Option v-for="(item,index) in PROGRESS_LIST"
                    :value="item.id"
                    :key="index">
              {{COMPETITION_TYPE[item.typeId-1].typeName}}
            </Option>
          </Select>
        </Col>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="5">
          <Button type="primary" >增加</Button>
          <Button type="primary" @click="exportsExcel">导出报名列表</Button>
          <Button type="primary" @click="reviewAll">全部通过</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records" stripe border >
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
      <template slot-scope="{ row, index }" slot="group">
        <div>
          <div v-for="(item,index) in row.works.studentGroup.members" :key="index">
            {{item.student.stuName}}
          </div>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="review(row,true)">
          通过
        </Button>
        <Button type="error" size="small" @click="review(row,false)">
          拒绝
        </Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import JoinExpand from '@/view/components/table-expand/join-expand'
export default {
  name: 'competition_enter_list',
  components: { JoinExpand },
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
              }
            })
          }
        },
        {
          key: 'id',
          title: 'id'
        },
        {
          title: '作品名',
          slot: 'works'
        },
        {
          title: '组员',
          slot: 'group'
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
      PROGRESS_LIST: [],
      COMPETITION_TYPE: [],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      },
      progressId: 0
    }
  },
  mounted () {
    this.handleGetType({ type: 'competition' }).then(res => {
      this.COMPETITION_TYPE = res.body
    })
    // 获取比赛进程
    this.handleGetProgressListByCompetitionId({ competitionId: this.competition.id })
      .then(res => {
        this.PROGRESS_LIST = res.body
        this.progressId = res.body[0].id
      }).then(() => {
        this.getEnterPage()
      })
  },
  methods: {
    ...mapActions([
      'handleGetEnterList',
      'handleExportEnterExcel',
      'handleSetJoinEnterState',
      'handleGetCompetitionById',
      'handleGetProgressListByCompetitionId',
      'handleGetType'
    ]),
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      this.getEnterPage(index, this.page.size)
    },
    /**
     * 获取学生报名列表
     */
    getEnterPage (pageNum = 1, pageSize = 12) {
      let competitionId = this.competition.id
      if (this.progressId === 0) { this.progressId = this.PROGRESS_LIST[0].id }
      this.handleGetEnterList({ pageNum, pageSize, competitionId, progressId: this.progressId }).then(res => {
        if (res.flag) {
          this.page = res.body
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 导出报名表
     */
    exportsExcel () {
      this.handleExportEnterExcel({ competitionId: this.competition.id }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    review (obj, flag) {
      if (this.check(obj)) {
        this.handleSetJoinEnterState({ joinId: obj.id, flag: flag }).then(res => {
          if (res) {
            this.$Message.success('成功')
            this.getEnterPage()
          } else {
            this.$Message.error('失败')
          }
        })
      } else {
        this.$Message.error('失败')
      }
    },
    reviewAll () {
      // 审核全部
    },
    check (obj) {
      return obj.apply_state === '通过' && obj.enter_state === '通过'
    }
  },
  computed: {
    ...mapGetters([
      'getEnterListCompetition'
    ]),
    competition () {
      return this.getEnterListCompetition
    }
  },
  watch: {
    progressId (val) {
      this.getEnterPage()
    }
  }
}
</script>

<style scoped>

</style>
