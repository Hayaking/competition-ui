<template>
  <Card>
    <!-- 对话框-->
    <Modal
      @on-cancel="cancel"
      @on-ok="addPermission"
      title="新增权限"
      v-model="show">
      <Input type="text" v-model="permissionName">
        <span slot="prepend">权限名</span>
      </Input>
    </Modal>

    <Row>
      <Col span="11">
        <Row>
          <Select v-model="roleId">
            <Option :key="item.id" :value="item.id" v-for="item in roleList">
              {{item.roleName}}
            </Option>
          </Select>
        </Row>
        <Table :columns="tb_head" :data="tb_res" border height="520" size="small" stripe></Table>
      </Col>
      <Col offset="2" span="11">
        <Row>
          <Col span="22">
            <Input enter-button="搜索" placeholder="搜搜" search/>
          </Col>
          <Col span="2">
            <Button @click="showModal" type="primary">增加</Button>
          </Col>
        </Row>
        <Table :columns="tb_all_permission_head" :data="tb_all_permission" border height="520" size="small"
               stripe></Table>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'edit_permission',
  data () {
    return {
      show: false,
      roleId: 0,
      roleList: [],
      tb_head: [
        {
          title: 'id',
          key: 'id'
        }, {
          title: '权限名',
          key: 'permissionName'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row._index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_res: [],
      tb_all_permission_head: [
        {
          title: 'id',
          key: 'id'
        }, {
          title: '权限名',
          key: 'permissionName',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('Input', {
                props: {
                  value: params.row.permissionName
                }
              })
            } else {
              return h('div', {
                on: {
                  dblclick: () => {
                    this.editPermissionName(params.row._index)
                  }
                }
              }, params.row.permissionName)
            }
          }
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.add(params.row._index)
                  }
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deletePermission(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_all_permission: [],
      tb_all_permission_back: [],
      permissionName: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('handleGetRoleList').then(res => {
        this.roleList = res
      })
      this.$store.dispatch('handleGetAllPermission').then(res => {
        res.map(item => {
          item.isEdit = false
        })
        this.tb_all_permission = res
        this.tb_all_permission_back = res
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllPermission',
      'handleGetPermission',
      'handleAddRolePermission',
      'handleDeleteRolePermission',
      'handleAddPermission',
      'handleDeletePermission'
    ]),
    /**
       * 使角色拥有某个权限
       * @param id
       */
    add (index) {
      let permission = this.tb_all_permission[index]
      let params = { roleId: this.roleId, permissionId: permission.id }
      this.handleAddRolePermission(params).then(res => {
        if (res) {
          this.tb_all_permission.splice(index, 1)
          this.tb_res.push(permission)
        }
      })
      this.$Message.success('添加成功')
    },
    /**
       * 移除角色拥有的权限
       * @param index
       */
    remove (index) {
      let params = { roleId: this.roleId, permissionId: this.tb_res[index].id }
      this.handleDeleteRolePermission(params).then(res => {
        if (res) {
          this.tb_all_permission.push(this.tb_res[index])
          this.tb_res.splice(index, 1)
          this.$Message.info('删除成功')
        }
      })
    },
    /**
       * 新建权限
       */
    addPermission () {
      this.handleAddPermission({ permissionName: this.permissionName }).then(res => {
        if (res) {
          this.handleGetAllPermission().then(res => {
            this.tb_all_permission = res
          })
        }
      })
    },
    /**
       * 删除权限
       * @param id
       */
    deletePermission (id) {
      this.handleDeletePermission({ permissionId: id }).then(res => {
        if (res) {
          this.handleGetAllPermission().then(res => {
            this.tb_all_permission = res
          })
        }
      })
    },
    /**
       * 编辑权限名字
       * @param index
       */
    editPermissionName (index) {
      this.tb_all_permission[index].isEdit = true
    },
    /**
       * 显示对话框
       */
    showModal () {
      this.show = true
    },
    /**
       * 取消对话框
       */
    cancel () {
      this.show = false
    },
    /**
       * 求差集
       * 对tb_all_permission_back与tb_all_permission求差集
       * 再赋值给tb_all_permission_back
       */
    differSet () {
      this.tb_all_permission = this.tb_all_permission.filter(item => {
        return this.tb_res.every((i) => {
          return i.id !== item.id
        })
      })
    }
  },
  watch: {
    roleId (val) {
      // 选择的角色变化时，获取其拥有的权限
      this.handleGetPermission({ roleId: val }).then(res => {
        this.tb_res = res
        this.tb_all_permission = this.tb_all_permission_back
        this.differSet()
      })
    }
  }
}
</script>

<style scoped>

</style>
