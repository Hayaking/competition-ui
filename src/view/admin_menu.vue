<template>
  <div>
    <MenuEditModal :show="show"
                   @cancel="cancel"/>

    <Card title="!">
      <ButtonGroup slot="extra">
        <Button type="primary" @click="save">提交</Button>
      </ButtonGroup>
      <Row>
        <Col span="18">
          <Table :columns="tb_head"
                 :data="tb_res"
                 :row-class-name="rowClassName1"
                 @on-row-click="click1"
                 border
                 height="650"
                 size="small">
            <template slot-scope="{ row, index }" slot="meta.title">
              {{row.meta.title}}
            </template>
            <template slot-scope="{ row, index }" slot="meta.icon">
              {{row.meta.icon}}
            </template>
            <template slot-scope="{ row, index }" slot="meta.hideInMenu">
              {{row.meta.hideInMenu}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="editMenu(row)">
                编辑
              </Button>
              <Button type="error" size="small" @click="deleteMenu(row)">
                删除
              </Button>
            </template>
          </Table>
        </Col>
        <Col span="5" offset="1">
          <Table :columns="tb_all_permission_head"
                 :data="tb_all_permission" :row-class-name="rowClassName2"
                 @on-row-click="click2"
                 border height="650"
                 size="small">
          </Table>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MenuEditModal from '@/view/components/modal/menu-edit-modal'
export default {
  name: 'edit_menu',
  components: { MenuEditModal },
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
          key: 'name',
          width: 150,
          fixed: 'left'
        }, {
          title: '路径',
          key: 'path',
          width: 200
        }, {
          title: '组件名',
          width: 200,
          key: 'component'
        }, {
          title: '标题',
          width: 100,
          slot: 'meta.title'
        }, {
          title: 'icon',
          width: 100,
          slot: 'meta.icon'
        }, {
          title: 'hideInMenu',
          width: 80,
          slot: 'meta.hideInMenu'
        }, {
          title: '操作',
          fixed: 'right',
          width: 130,
          slot: 'action'
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
      highlight_row2: -1,
      show: false
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
    },
    editMenu (obj) {
      this.$store.commit('setEditMenu', obj)
      this.show = true
    },
    deleteMenu (obj) {
      this.console.info(obj)
    },
    cancel () {
      this.show = false
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
