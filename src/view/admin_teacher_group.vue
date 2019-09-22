<template>
  <Card>
    <Input enter-button
           search
           style="width: 500px"
           @on-change="search"
           v-model="key"/>
    <Table :columns="tb_head" :data="tb_res" stripe></Table>
    <Page :current="page.current"
          :page-size="page.page_size"
          :total="page.total"
          @on-change="pageChange"
          show-total
    />
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'review_apply_competition',
  data () {
    return {
      key: '',
      tb_head: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '创建者',
          key: 'creator'
        },
        {
          title: '申请时间',
          key: 'createTime'
        },
        {
          title: '状态',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.groupState === '通过' ? 'success' : params.row.groupState === '申请中' ? 'primary' : 'error'
              },
              on: {
                click: () => {
                  this.review(params.row.id, params.row.groupState !== '通过')
                }
              }
            }, params.row.state)
          }
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
      this.getApply()
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllTeacherGroup',
      'handleSetTeacherGroupState',
      'handleSearchTeacherGroup'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    /**
       * 分页获取学生或教师
       */
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetAllTeacherGroup({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    review (id, flag) {
      this.handleSetTeacherGroupState({ id, flag }).then(res => {
        if (res) {
          this.getApply()
        }
      })
    },
    search () {
      if (this.key === '') {
        this.getApply()
        return
      }
      let params = {
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }
      this.handleSearchTeacherGroup(params).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    }
  }

}
</script>

<style scoped>

</style>
