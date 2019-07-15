<template>
  <Card>
    <Row>
      <Col span="15">
        <Table  @on-row-click="click" ref="currentRowTable" :columns="tb_head" :data="tb_res" border stripe highlight-row></Table>
      </Col>
      <Col offset="2" span="7">
        <Table highlight-row ref="currentRowTable" :columns="tb_all_permission_head" :data="tb_all_permission" border stripe></Table>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'
export default {

  name: 'edit_menu',
  data () {
    return {
      roleId: 0,
      roleList: [],
      tb_head: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '名字',
          key: 'name'
        }, {
          title: '路径',
          key: 'path'
        }, {
          title: '组件名',
          key: 'component'
        }
      ],
      tb_res: [],
      tb_all_permission_head: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        }, {
          title: '权限名',
          key: 'permissionName'
        }
      ],
      tb_all_permission: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('handleGetAllPermission').then(res => {
        this.tb_all_permission = res
      })
      this.$store.dispatch('handleGetAllRoute').then(res => {
        this.tb_res = res
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetRoleList'
    ]),
    click (data) {
      let id = this.tb_res[data.id - 1].id
      console.info(id)
    }
  }
}
</script>

<style scoped>

</style>
