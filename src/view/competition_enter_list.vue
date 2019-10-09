<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="1">
          {{competitionId}}
        </Col>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="5">
          <Button type="primary" >增加</Button>
          <Button type="primary" @click="exportsExcel">导出报名列表</Button>
        </Col>
      </Row>
    </div>

    <Table :columns="tb_head" :data="tb_res" stripe border >
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="group">
        <div>
          <div v-for="item in row.works.studentGroup.members" :key="item.hash">
            {{item.student.stuName}}
          </div>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="review(row)">
          通过
        </Button>
        <Button type="error" size="small" @click="review(row)">
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
import { mapActions } from 'vuex'

export default {
  name: 'competition_enter_list',
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
      competitionId: 0,
      competitionType: [],
      tb_head: [
        {
          key: 'id',
          title: 'id'
        },
        {
          title: '作品名',
          slot: 'works'
        },
        {
          title: '参赛成员',
          slot: 'group'
        },
        {
          key: 'teacherId1',
          title: '指导老师'
        }, {
          key: 'applyState',
          title: '指导教师申请状态'
        }, {
          key: 'enterState',
          title: '报名状态'
        }, {
          key: 'joinState',
          title: '参赛状态'
        }, {
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
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.competitionId = this.$route.params.id
      this.getEnterPage()
      this.getCompetitionType()
    })
  },
  methods: {
    ...mapActions([
      'handleGetEnterListByCompetitionId',
      'handleExportEnterExcel',
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
      let competitionId = this.competitionId
      this.handleGetEnterListByCompetitionId({ pageNum, pageSize, competitionId }).then(res => {
        this.page = res
        this.tb_res = res.records
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
    exportsExcel () {
      this.handleExportEnterExcel({ competitionId: this.competitionId }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },

  },
  watch: {
    competitionId () {
      this.getEnterPage()
    }
  }
}
</script>

<style scoped>

</style>
