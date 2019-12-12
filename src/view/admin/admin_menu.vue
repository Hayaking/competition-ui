<template>
  <div>
    <MenuEditModal :show="show" @cancel="cancel"/>
    <Card>
      <div slot="title">
        <Select v-model="roleId" style="width:200px">
          <Option v-for="(item,index) in ROLE_LIST"
                  :value="item.id"
                  :key="index">
            {{ item.roleName }}
          </Option>
        </Select>
      </div>
      <div slot="extra">
        <Button type="primary">提交</Button>
      </div>
      <Tree :data="data"
            show-checkbox
            @on-check-change="checkChange"
      />
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
      ROLE_LIST: [],
      MENU_ALL: [],
      menuList: [],
      show: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.roleId = 1
      this.handleGetRoleList().then(res => {
        this.ROLE_LIST = res
      })
      this.handleGetAllMenu().then(res => {
        res.flag
          ? this.MENU_ALL = res.body
          : this.$Message.error('获取失败')
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetRoleList',
      'handleGetAllMenu',
      'handleGetMenuListByRoleId',
      'handleSetRoleAndMenu'
    ]),
    editMenu (obj) {
      this.$store.commit('setEditMenu', obj)
      this.show = true
    },
    deleteMenu (obj) {
      this.console.info(obj)
    },
    cancel () {
      this.show = false
    },
    checkChange (obj, item) {
      // 一级菜单
      if (item.hasOwnProperty('children')) {
        let id = this.MENU_ALL.find(f => { return this.$t(f.name) === item.title }).id
        this.handleSetRoleAndMenu({
          roleId: this.roleId,
          menu1Id: id,
          flag: item.checked,
          tag: true
        }).then(res => {
          res ? this.$Message.success('成功') : this.$Message.error('失败')
        })
      } else {
        let menu1Id
        let menu2Id
        this.MENU_ALL.find(menu1 => {
          // 在一级菜单里找二级菜单
          let menu2 = menu1.children.find(menu2 => { return this.$t(menu2.name) === item.title })
          if (menu2 !== undefined) {
            menu2Id = menu2.id
            menu1Id = menu1.id
          }
          return menu2 !== undefined
        })
        this.handleSetRoleAndMenu({
          roleId: this.roleId,
          menu1Id,
          menu2Id,
          flag: item.checked,
          tag: false
        }).then(res => {
          res ? this.$Message.success('成功') : this.$Message.error('失败')
        })
      }
    }
  },
  computed: {
    data () {
      return this.MENU_ALL.map(item => {
        let menu1
        this.menuList.length > 0
          ? menu1 = this.menuList.find(f => { return f.name === item.name })
          : menu1 = undefined
        return {
          id: item.id,
          title: this.$t(item.name),
          expand: true,
          children: item.children.map(child => {
            return {
              title: this.$t(child.name),
              // menu1===true时说明有一级菜单
              checked: menu1 !== undefined
                ? menu1.children.find(f => { return f.name === child.name }) !== undefined
                : false
            }
          })
        }
      })
    }
  },
  watch: {
    roleId (newVal) {
      this.handleGetMenuListByRoleId({ roleId: newVal }).then(res => {
        res.flag
          ? this.menuList = res.body
          : this.$Message.error('获取失败')
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
