<template>
    <div class="demo-split">
      <Split v-model="split">
        <div slot="left" class="demo-split-pane">
          <div v-for="item in inviting" :key="item.id">
            <Sender :item="item" @clicked="qh"></Sender>
          </div>
        </div>
        <div slot="right" class="demo-split-pane">
          <InviteMessage :content="content" style="margin: 15px"></InviteMessage>
        </div>
      </Split>
    </div>

</template>

<script>
import { mapActions } from 'vuex'
import Sender from '@/view/components/message_sender_item'
import InviteMessage from '@/view/components/invite-message'

export default {
  name: 'message',
  components: { Sender, InviteMessage },
  data () {
    return {
      split: 0.3,
      inviting: [],
      content: ''
    }
  },
  mounted () {
    this.handleGetTeacherGroupInviting().then(res => {
      this.inviting = res
    })
  },
  methods: {
    ...mapActions([
      'handleGetTeacherGroupInviting'
    ]),
    qh (item) {
      console.info(item)
      this.content = item
    }
  }
}
</script>

<style scoped>
  .demo-split{
    height: 100%;
    border: 1px solid #e5e7eb;
    background-color: #fff;
  }
  .demo-split-pane{
    padding: 15px;
  }
</style>
