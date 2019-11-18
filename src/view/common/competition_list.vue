<template>
  <Card>
    <div slot="title">
      <Input
        search
        style="width: 300px;"
        @on-change="search"
        v-model="key"/>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records" stripe border >
      <!--竞赛级别-->
      <template slot-scope="{ row, index }" slot="level">
        {{level(row.minLevelId,row.maxLevelId)}}
      </template>
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
      <template slot-scope="{ row, index }" slot="action">
        <Button @click="enter(row.id)"
                type="primary"
                size="small"
                :disabled="row.enterState === '结束'">
          参赛
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
import { mapActions } from 'vuex'
import CompetitionExpand from '@/view/components/table-expand/competition-expand'

export default {
  name: 'common_competition',
  components: { CompetitionExpand },
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
                row: params.row
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
          key: 'intro',
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          slot: 'action'
        }
      ],
      page: {
        current: 1,
        size: 12,
        total: 0,
        records: []
      },
      key: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
      this.getCompetitionPage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetAllPassCompetition',
      'handleSearchPassCompetition',
      'handleGetCompetitionById'
    ]),
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
    pageChange (index) {
      this.page.current = index
      this.key !== ''
        ? this.search()
        : this.getCompetitionPage(index, this.page.size)
    },
    getCompetitionPage (pageNum = 1, pageSize = 12) {
      this.handleGetAllPassCompetition({ pageNum, pageSize }).then(res => {
        this.page = res
      })
    },
    enter (id) {
      this.handleGetCompetitionById({ id }).then(res => {
        res
          ? this.$router.push({ name: 'stu_join' })
          : this.$Message.error('失败')
      })
    },
    search () {
      if (this.key === '') {
        this.getCompetitionPage()
        return
      }
      // 得到已经通过审核的竞赛
      this.handleSearchPassCompetition({
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        this.page = res
      })
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
    }
  }
}
</script>

<style scoped>

</style>
