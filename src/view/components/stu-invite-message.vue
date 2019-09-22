<template>
  <div v-if="content">
    <table class="group-info">
      <tr>
        <td>工作组id:</td>
        <td>{{content.id}}</td>
      </tr>
      <tr>
        <td>小组名:</td>
        <td>{{content.name}}</td>
      </tr>
      <tr>
        <td>创建者:</td>
        <td>{{content.creator}}</td>
      </tr>
      <tr>
        <td>创建时间:</td>
        <td>{{content.createTime}}</td>
      </tr>
    </table>
    <Button type="success" @click=review(true)>接受</Button>
    <Button type="error" @click="review(false)">拒绝</Button>
  </div>
  <div v-else>
    啥都没
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'invite-message',
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapActions([
      'handleAgreeTeacherGroupInvite',
      'handleRefuseTeacherGroupInvite'
    ]),
    review (flag) {
      if (flag) {
        this.handleAgreeTeacherGroupInvite({ groupId: this.content.id }).then(res => {
          this.$Message.success('成功')
        })
      } else {
        this.handleRefuseTeacherGroupInvite({ groupId: this.content.id }).then(res => {
          this.$Message.success('失败')
        })
      }
    }
  }
}
</script>

<style scoped>
 .group-info tr td:nth-child(1){
   padding: 2px;
   font-size: 20px;
 }
 .group-info tr td:nth-child(2){
   padding-left: 10px;
   font-size: 15px;
 }
</style>
