<template>
  <Card>
    <div slot="title">
      <Input search
             style="width: 300px"
             @on-change="search"
             v-model="key">
      </Input>
      <ButtonGroup>
        <Button  type="primary">全部通过</Button>
<!--        <Button type="primary">全部开始报名</Button>-->
      </ButtonGroup>
    </div>
    <Table :columns="TABLE_HEAD" :data="tb_res" stripe border >
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
      <!--下载-->
      <template slot-scope="{ row, index }" slot="download">
        <CompetitionAction :row="row"/>
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
import CompetitionExpand from '@/view/components/table-expand/competition-expand'
import CompetitionAction from '@/view/components/action-expand/admin-competition-expand'

export default {
  name: 'admin_competition',
  components: { CompetitionExpand, CompetitionAction },
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
        },
        {
          title: '下载',
          align: 'center',
          width: 200,
          slot: 'download'
        }
      ],
      key: '',
      tb_res: [],
      page: {
        current: 1,
        page_size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
      this.getApplyPage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetAllCompetition',
      'handleSetCompetitionState',
      'handleSearchCompetition'
    ]),
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    },
    pageChange (index) {
      this.page.current = index
      this.getApplyPage(index, this.page.size)
    },
    getApplyPage (pageNum = 1, pageSize = 12) {
      this.handleGetAllCompetition({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    /**
     * 审核competition
     */
    review (id, flag) {
      this.handleSetCompetitionState({ id, flag }).then(res => {
        if (res) {
          this.getApplyPage()
        }
      })
    },
    search () {
      if (this.key === '') {
        this.getApplyPage()
        return
      }
      let params = {
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }
      this.handleSearchCompetition(params).then(res => {
        this.page = res
        this.tb_res = res.records
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
