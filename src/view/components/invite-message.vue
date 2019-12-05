<template>
  <div v-if="inviteMessage">
    <div :key="index" v-for="(item,index) in inviteMessage">
      <Row>
        <Col span="2">
          <Avatar icon="ios-person" size="large" />
        </Col>
        <Col span="22">
          <Card class="message-item" padding="0">
            <div class="body">
              {{item.body}}
            </div>
            <br>
            <Row>
              <Col span="12">
                <Button :disabled="item.isRead" @click=review(item.id,index,true,item.extra) long type="success">接受</Button>
              </Col>
              <Col span="12">
                <Button :disabled="item.isRead" @click="review(item.id,index,false,item.extra)" long type="error">拒绝</Button>
              </Col>
            </Row>
          </Card>
          <Time :time="new Date(item.createTime)" />
          <span v-if="item.isRead">✔️</span>
          <span v-else>⭕</span>
        </Col>
      </Row>
    </div>
  </div>
  <div v-else>
    啥都没
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'invite-message',
  methods: {
    ...mapActions([
      'handleReviewTeacherGroupInvite',
      'handleSetReadMessage'
    ]),
    review (id, index, flag, groupId) {
      this.handleReviewTeacherGroupInvite({ flag, groupId }).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.handleSetReadMessage({ id })
          this.inviteMessage[index].isRead = true
        } else {
          this.$Message.error('失败')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getInviteMessage'
    ]),
    inviteMessage () {
      return this.getInviteMessage
    }
  }
}
</script>

<style scoped>
  .group-info tr td:nth-child(1) {
    padding: 2px;
    font-size: 20px;
  }

  .group-info tr td:nth-child(2) {
    padding-left: 10px;
    font-size: 15px;
  }

  .message-item {
    font-size: large;
    color: #fff;
    width: 30%;
    background-color: #5cadff;
  }

  .message-item .body {
    margin: 10px;
  }
</style>
