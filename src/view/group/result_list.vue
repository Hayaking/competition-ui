<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="2">
          {{competition.name}}
        </Col>
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
          <Input search class="tool-bar"/>
        </Col>
        <Col span="5">
          <Button type="primary" @click="endCurrentProgress">结束当前阶段</Button>
          <Button type="primary" @click="submitResultList">提交当前比赛结果</Button>
        </Col>
      </Row>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           stripe
           border >
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.join.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="competition">
        <div>{{row.competition.name}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="enterState">
        <Tag>{{row.enterState}}</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="group">
        <Group :id="row.join.groupId" />
      </template>
      <template slot-scope="{ row, index }" slot="person">
        <Person :id="row.join.creatorId"/>
      </template>
      <template slot-scope="{ row, index }" slot="isPrice">
        <Tag v-if="row.isPrice" color="success">是</Tag>
        <Tag v-else color="error">否</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="reviewState">
        <Tag v-if="row.reviewState" color="success">是</Tag>
        <Tag v-else color="error">否</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="review(row.id,1,false)">
          得奖了
        </Button>
        <Button type="primary" size="small" @click="review(row.id,-1,false)">
          没得奖
        </Button>
        <Button type="error" size="small" @click="review(row.id,0,true)">
          打回修改
        </Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
    <ResultModal
      :show="showResult"
      @cancel="cancel"
      :progressId="progressId"
    />
  </Card>
</template>

<script>

import Group from '@/view/group/components/cell/group'
import Person from '@/view/group/components/cell/person'
import { mapActions, mapGetters } from 'vuex'
import JoinExpand from '@/view/components/table-expand/join-expand'
import PriceExpand from '@/view/group/components/expand/price-expand'
import ResultModal from '@/view/group/components/modal/submit-result-modal'
export default {
  name: 'competition_result_list',
  components: { JoinExpand, PriceExpand, ResultModal, Group, Person },
  data () {
    return {
      TABLE_HEAD: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(PriceExpand, {
              props: {
                row: params.row,
                flag: this.flag
              },
              on: {
                showProcess: (competitionId) => {
                  this.showProcess(competitionId)
                },
                showResult: (competitionId) => {
                  this.showResult(competitionId)
                },
                showEdit: (competitionId) => {
                  this.showEditCompetition(competitionId)
                },
                showEnterList: (competitionId) => {
                  this.showEnterList(competitionId)
                },
                toDelete: (competitionId) => {
                  this.deleteCompetition(competitionId)
                },
                toSetProgress: (competitionId) => {
                  this.setProgress(competitionId)
                }
              }
            })
          }
        },
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '是否得奖',
          slot: 'isPrice'
        },
        {
          title: '是否审核通过',
          slot: 'reviewState'
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
      progressId: 0,
      showResult: false
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
        this.getResultPage()
      })
  },
  methods: {
    ...mapActions([
      'handleGetEnterList',
      'handleExportEnterExcel',
      'handleSetJoinEnterState',
      'handleGetProgressListByCompetitionId',
      'handleGetType',
      'handlePromotion',
      'handleGetJoinListByProgressId',
      'handleReviewJoinInProgress',
      'handleEndProgress',
      'handleSetProgressResultState'
    ]),
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      this.getResultPage(index, this.page.size)
    },
    getResultPage (pageNum = 1, pageSize = 12) {
      if (this.progressId === 0) { this.progressId = this.PROGRESS_LIST[0].id }
      this.handleGetJoinListByProgressId({
        pageNum,
        pageSize,
        progressId: this.progressId
      }).then(res => {
        if (res.flag) {
          this.page = res.body
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 审核比赛结果
     * @param inProgressId
     * @param reviewState
     * @param editState
     */
    review (inProgressId, reviewState, editState) {
      this.handleReviewJoinInProgress({ inProgressId, reviewState, editState }).then(res => {
        if (res) {
          this.getResultPage()
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 结束当前阶段
     */
    endCurrentProgress () {
      this.handleEndProgress({ id: this.progressId }).then(res => {
        if (res.flag) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    },
    /**
     * 将比赛结果提交给管理员审核
     */
    submitResultList () {
      this.showResult = true
      // this.handleSetProgressResultState({ id: this.progressId, state: true }).then(res => {
      //   if (res.flag) {
      //     this.$Message.success('成功')
      //   } else {
      //     this.$Message.error('失败')
      //   }
      // })
    },
    cancel () {
      this.showResult = false
    }
  },
  computed: {
    ...mapGetters([
      'getResultListCompetition'
    ]),
    competition () {
      return this.getResultListCompetition
    }
  },
  watch: {
    progressId (val) {
      let progress = this.PROGRESS_LIST.find(item => {
        return item.id === val
      })
      if (progress.isSingle) {
        this.TABLE_HEAD.splice(2, 0, {
          title: '参赛人员1',
          slot: 'person'
        })
      } else {
        this.TABLE_HEAD.splice(2, 0, {
          title: '参赛人员2',
          slot: 'group'
        })
      }
      if (progress.isNeedWorks) {
        this.TABLE_HEAD.splice(2, 0, {
          title: '作品名',
          slot: 'works'
        })
      }
      this.getResultPage()
    }
  }
}
</script>

<style>

</style>
