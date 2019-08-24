<template>
  <div>
    <Row>
      <Col span="11">
        <Card title="国赛" padding="0">
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <Table :columns="tb_head" :data="tb_res_gs"></Table>
        </Card>
      </Col>
      <Col span="2">&nbsp; </Col>
      <Col span="11">
        <Card title="省赛" padding="0">
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <Table :columns="tb_head" :data="tb_res_ss"></Table>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card title="最近获奖状况" padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'
export default{
  name: 'home',
  data () {
    return {
      tb_head: [
        {
          title: '比赛名称',
          key: 'name'
        },
        {
          title: '开始时间',
          key: 'startTime',
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.startTime))
          }
        },
        {
          title: '操作',
          width: 100,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showRoleModal(params.row)
                }
              }
            }, '参赛')
          }
        }
      ],
      tb_res_gs: [],
      tb_res_ss: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 国赛
      this.$store.dispatch('handleGet5ByTypeId', { typeId: 4 }).then(res => {
        this.tb_res_gs = res
      })
      // 省赛
      this.$store.dispatch('handleGet5ByTypeId', { typeId: 3 }).then(res => {
        this.tb_res_ss = res
      })
    })
  },
  methods: {
    more () {
      this.$router.push({ name: 'common_competition' })
    }
  }
}
</script>

<style scoped>

</style>
