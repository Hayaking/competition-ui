<template>
  <Card>
    <div slot="title">
      <Input search
             style="width: 300px"
             @on-change="search"
             v-model="key"/>
      <ButtonGroup>
        <Button @click="refresh" type="primary">刷新</Button>
      </ButtonGroup>
    </div>
    <Table :columns="tb_head" :data="page.records" stripe>
      <template slot-scope="{ row, index }" slot="creator">
        <div>{{row.creator.teacherName}}</div>
      </template>
    </Table>
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
          slot: 'creator'
        },
        {
          title: '申请理由',
          key: 'reason'
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
                type: params.row.state === '通过' ? 'success' : params.row.state === '申请中' ? 'primary' : 'error'
              },
              on: {
                click: () => {
                  this.review(params.row.id, params.row.state !== '通过')
                }
              }
            }, params.row.state)
          }
        }
      ],
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
      })
    },
    refresh () {
      this.getApply()
    }
  }

}
</script>

<style scoped>

</style>
