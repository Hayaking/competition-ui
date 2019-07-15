<template>
  <Card>
    <!--    对话框-->
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
        <Table :columns="tb_head" :data="tb_res" border stripe></Table>
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
        <Table :columns="tb_all_permission_head" :data="tb_all_permission" border stripe></Table>
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
      permissionName: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('handleGetRoleList').then(res => {
        this.roleList = res
        console.info(res)
      })
      this.$store.dispatch('handleGetAllPermission').then(res => {
        this.tb_all_permission = res
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
    add (id) {
      let flag = true
      let target = this.tb_all_permission[id]
      this.tb_res.forEach((item) => {
        if (item.id === target.id) {
          flag = false
          this.$Message.error('重复了')
        }
      })
      if (flag) {
        let roleId = this.roleId
        let permissionId = target.id
        this.handleAddRolePermission({ roleId, permissionId }).then(res => {
          if (res) {
            this.tb_res.push(target)
          }
        })
        this.$Message.success('添加成功')
      }
      console.info(this.tb_res)
    },
    remove (id) {
      let roleId = this.roleId
      let permissionId = this.tb_all_permission[id].id
      this.handleDeleteRolePermission({ roleId, permissionId }).then(res => {
        if (res) {
          this.tb_res.splice(id, 1)
          this.$Message.info('删除成功')
        }
      })
    },
    showModal () {
      this.show = true
    },
    addPermission () {
      let permissionName = this.permissionName
      this.handleAddPermission({ permissionName }).then(res => {
        if (res) {
          this.handleGetAllPermission().then(res => {
            this.tb_all_permission = res
          })
        }
      })
    },
    cancel () {
      this.show = false
    },
    deletePermission (id) {
      let permissionId = id
      this.handleDeletePermission({ permissionId }).then(res => {
        if (res) {
          this.handleGetAllPermission().then(res => {
            this.tb_all_permission = res
          })
        }
      })
    }
  },
  watch: {
    roleId (val) {
      let roleId = val
      this.handleGetPermission({ roleId }).then(res => {
        this.tb_res = res
      })
    }
  }
}
</script>

<style scoped>

</style>
