<template>
  <Card>
    <JoinModal :show="show"
               @cancel="cancel"
    />
    <Input search enter-button style="width: 500px"/>
    <Table :columns="tb_head" :data="tb_res" border height="520" size="small" stripe>
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="competition">
        <div>{{row.competition.name}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="success" size="small" style="margin-right: 5px" @click="editJoin(row)">
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
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
  </Card>
</template>

<script>
import JoinModal from '@/view/components/modal/join-edit_modal'
import { mapActions } from 'vuex'

export default {
  name: 'stu_join_list',
  components: { JoinModal },
  data () {
    return {
      tb_head: [
        {
          key: 'id',
          title: 'id'
        }, {
          title: '作品id',
          slot: 'works'
        }, {
          title: '比赛id',
          slot: 'competition'
        }, {
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
      },
      show: false
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
        this.tb_res = res.records
      })
    },
    editJoin (obj) {
      this.show = true
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
    cancel () {
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
