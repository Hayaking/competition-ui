<template>
    <div class="demo-split">
      <Split v-model="split">
        <!--左边列表-->
        <div slot="left" class="left-split-pane">
          <Card :padding="0" title="消息列表">
            <CellGroup @on-click="switchRight">
              <Cell title="🤙 邀请信息" :name="1"/>
              <Cell title="🖥️ 系统消息" :name="2"/>
            </CellGroup>
          </Card>
        </div>
        <!--右边-->
        <div slot="right" class="demo-split-pane">
          <div v-if="index===1">
            <InviteMessage style="margin: 15px"/>
          </div>
          <div v-else-if="index===2">
            {{systemMessage}}
          </div>
<!--          <StuInviteMessage :content="content" style="margin: 15px"  v-else-if="switch_index === 1"/>-->
        </div>
      </Split>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import InviteMessage from '@/view/components/invite-message'
import StuInviteMessage from '@/view/components/stu-invite-message'

export default {
  name: 'message',
  components: { InviteMessage, StuInviteMessage },
  data () {
    return {
      split: 0.3,
      message: new Map(),
      group: [],
      content: null,
      index: 0
    }
  },
  mounted () {
    this.handleGetMessage().then(res => {
      this.message = res
    })
  },
  methods: {
    ...mapActions([
      'handleGetMessage'
    ]),
    switchRight (index) {
      this.index = index
    }
  },
  computed: {
    ...mapGetters([
      'getSystemMessage',
      'getInviteMessage'
    ]),
    systemMessage () {
      return this.getSystemMessage
    },
    inviteMessage () {
      return this.getInviteMessage
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
  .left-split-pane{
    padding: 0;
  }
</style>
