<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          {{userName}}
        </DropdownItem>
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      getter: this.$store.getters
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(res => {
        this.$socket.emit('logout')
        location.reload()
        this.$router.push({ name: 'login' })
      })
    },
    message () {
      this.$router.push({
        name: 'common_message.vue'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'common_message.vue': this.message()
          break
      }
    }
  },
  computed: {
    userName: {
      get () {
        if (this.getter.getUserInfo.stuName) {
          return this.getter.getUserInfo.stuName
        }
        if (this.getter.getUserInfo.teacherName) {
          return this.getter.getUserInfo.teacherName
        }
      }
    }
  }
}
</script>
