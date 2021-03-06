<template>
  <Card>
    <div slot="title">
      <Row>
        <span style="font-size: 20px">{{competition.name}}</span>
        <Row>
          <Col span="3">
            <Select v-model="progressId">
              <Option v-for="(item,index) in PROGRESS_LIST"
                      :value="item.id"
                      :key="index">
                {{item.name}}
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
      </Row>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           stripe
           border >
      <template slot-scope="{ row, index }" slot="competition">
        <div>{{row.progress.competition.name}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.join.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="teacher1">
        <div v-if="row.join.teacher1 === null">无</div>
        <Row v-else>
          <Col span="12">
            {{row.join.teacher1.teacherName}}
          </Col>
          <Col span="12">
            <Tag color="primary">{{row.join.applyState}}</Tag>
          </Col>
        </Row>
      </template>
      <template slot-scope="{ row, index }" slot="teacher2">
        <div v-if="row.join.teacher2 === null">无</div>
        <Row v-else>
          <Col span="12">
            {{row.join.teacher2.teacherName}}
          </Col>
          <Col span="12">
            <Tag color="primary">{{row.join.applyState2}}</Tag>
          </Col>
        </Row>
      </template>
      <template slot-scope="{ row, index }" slot="enterState">
        <Tag v-if="row.getEnterPage === -1" color="error">拒绝</Tag>
        <Tag v-else-if="row.getEnterPage === 0" color="primary">等待</Tag>
        <Tag v-else color="success">已报名</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="group">
        <Group :id="row.join.groupId" />
      </template>
      <template slot-scope="{ row, index }" slot="person">
        <Person :id="row.join.creatorId"/>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="review(row,1)">
          通过
        </Button>
        <Button type="error" size="small" @click="review(row,-1)">
          拒绝
        </Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="promotion(row,true)">
          晋级
        </Button>
        <Button type="error" size="small" @click="promotion(row,false)">
          淘汰
        </Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"/>
  </Card>
</template>

<script>
import Group from '@/view/group/components/cell/group'
import Person from '@/view/group/components/cell/person'
import { mapActions, mapGetters } from 'vuex'
import JoinExpand from '@/view/components/table-expand/join-expand'
export default {
  name: 'competition_enter_list',
  components: { JoinExpand, Group, Person },
  data () {
    return {
      TABLE_HEAD: [
        {
          title: 'id',
          key: 'id'
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
          slot: 'enterState'
        },
        {
          title: '晋级状态',
          key: 'isPromotion'
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
      })
      .then(() => {
        this.getEnterPage()
      })
  },
  methods: {
    ...mapActions([
      'handleGetEnterList',
      'handleDownloadEnterListExcel',
      'handleSetJoinEnterState',
      'handleGetProgressListByCompetitionId',
      'handleGetType',
      'handlePromotion',
      'handleGetWorksById'
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
      if (this.progressId === 0) {
        this.progressId = this.PROGRESS_LIST[0].id
      }
      this.handleGetEnterList({
        pageNum,
        pageSize,
        competitionId,
        progressId: this.progressId
      }).then(res => {
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
      this.handleDownloadEnterListExcel({
        competitionId: this.competition.id,
        progressId: this.progressId
      }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 审核报名
     * @param obj
     * @param flag
     */
    review (obj, flag) {
      this.handleSetJoinEnterState({ inProgressId: obj.id, flag: flag }).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.getEnterPage()
        } else {
          this.$Message.error('失败')
        }
      })
    },
    reviewAll () {
      // 审核全部
    },
    promotion (obj, flag) {
      this.handlePromotion({ joinInProgressId: obj.id, flag }).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.getEnterPage()
        } else {
          this.$Message.error('失败')
        }
      })
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
      let progress = this.PROGRESS_LIST.find(item => {
        return item.id === val
      })
      if (progress.isSingle) {
        this.TABLE_HEAD.splice(1, 0, {
          title: '参赛人员1',
          slot: 'person'
        })
      } else {
        this.TABLE_HEAD.splice(1, 0, {
          title: '参赛人员2',
          slot: 'group'
        })
      }
      if (progress.isNeedWorks) {
        this.TABLE_HEAD.splice(1, 0, {
          title: '作品名',
          slot: 'works'
        })
      }
      this.getEnterPage()
    }
  }
}
</script>

<style>

</style>
