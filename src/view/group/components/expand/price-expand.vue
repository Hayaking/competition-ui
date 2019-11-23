<template>
  <div>
    <Row >
      <Col span="24">
        <Spin size="large" fix v-if="isLoading"/>
        {{price}}
      </Col>
    </Row>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'
import { mapActions } from 'vuex'

export default {
  name: 'stu-join-expand',
  props: {
    row: Object
  },
  mounted () {
    this.handleGetType({ type: 'competition' }).then(res => {
      res.flag
        ? this.COMPETITION_TYPE = res.body
        : this.$Message.error('获取竞赛类型失败')
    })
  },
  data () {
    return {
      COMPETITION_TYPE: [],
      price: {},
      isLoading: true
    }
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetPriceByJipId'
    ]),
    /**
       * 格式化时间
       * @param time
       */
    formatDate (time) {
      return dateFomat(time)
    },
    getPrice (id) {
      this.isLoading = true
      this.handleGetPriceByJipId({ joinInProgressId: id }).then(res => {
        this.price = res.body
      }).then(() => {
        this.isLoading = false
      })
    }
  },
  watch: {
    row: {
      handler (val) {
        this.getPrice(val.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
  .ivu-table .table-info-primary td {
    background-color: #2db7f5 !important;
    color: #fff;
  }

  .ivu-table .table-info-warning td {
    background-color: #ffe70c !important;
    color: #14161d;
  }

  .ivu-table .table-info-success td {
    background-color: #187 !important;
    color: #fff;
  }
</style>
