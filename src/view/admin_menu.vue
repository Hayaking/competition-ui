<template>
  <Card>
    <Row align="middle" justify="center" type="flex">
      <Col span="15">
        <Table :columns="tb_head" :data="tb_res" :row-class-name="rowClassName1" @on-row-click="click1" border
               height="700" size="small"></Table>
      </Col>
      <Col span="2">
        <Button type="primary" @click="save">提交</Button>
      </Col>
      <Col span="7">
        <Table :columns="tb_all_permission_head" :data="tb_all_permission" :row-class-name="rowClassName2"
               @on-row-click="click2"
               border height="700" size="small"></Table>
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
      tb_all_permission: [],
      highlight_row1: -1,
      highlight_row2: -1
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
      'handleGetRoleList',
      'handleGetId',
      'handleSavePermissionMenu'
    ]),
    /**
     * 根据菜单id获取权限id，并高亮对它们
     * @param data
     * @param index 索引
     */
    click1 (data, index) {
      let flag = true
      this.handleGetId({ menuId: this.tb_res[index].id }).then(res => {
        this.tb_all_permission.forEach((item, index) => {
          if (item.id === res) {
            flag = false
            this.highlight_row2 = index
          }
        })
      })
      if (flag) {
        this.highlight_row2 = -1
      }
      this.highlight_row1 = index
    },
    click2 (data, index) {
      this.highlight_row2 = index
    },
    rowClassName1 (row, index) {
      // 高亮
      if (index === this.highlight_row1) {
        return 'table-row'
      }
      // 斑马纹
      if (index % 2 === 1) {
        return 'stripe-row'
      }
      return ''
    },
    rowClassName2 (row, index) {
      // 高亮
      if (index === this.highlight_row2) {
        return 'table-row'
      }
      // 斑马纹
      if (index % 2 === 1) {
        return 'stripe-row'
      }
      return ''
    },
    save () {
      let params = {
        menuId: this.tb_res[this.highlight_row1].id,
        permissionId: this.tb_all_permission[this.highlight_row2].id
      }
      this.handleSavePermissionMenu(params).then(res => {
        if (res) {
          this.$Message.success('成功')
        }
      })
    }
  }
}
</script>

<style>

  .ivu-table .table-row td {
    background-color: #ff9460;
    color: #fff;
  }

  .ivu-table .stripe-row td {
    background-color: #f7f7f7;
    color: #000000;
  }
</style>
