<template>
    <div class="demo-split">
      <Split v-model="split">
        <!--左边列表-->
        <div slot="left" class="left-split-pane">
          <Card :padding="0" title="消息列表">
            <CellGroup @on-click="switchGroup">
              <Cell v-for="(item,index) in message.teacher_group"
                    :key="item.id"
                    :name="index"
                    :title="item" />
            </CellGroup>
            <CellGroup @on-click="switchGroup">
              <Cell v-for="(item,index) in message.student_group"
                    :key="item.id"
                    :name="index"
                    :title="item" />
            </CellGroup>
            <CellGroup @on-click="switchJoin">
              <Cell v-for="(item,index) in message.join"
                    :key="item.id"
                    :name="index"
                    :title="item.groupName" />
            </CellGroup>
          </Card>
        </div>
        <!--右边-->
        <div slot="right" class="demo-split-pane">
          <InviteMessage :content="content" style="margin: 15px"  v-if="switch_index === 0"/>
          <StuInviteMessage :content="content" style="margin: 15px"  v-else-if="switch_index === 1"/>
        </div>
      </Split>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

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
      switch_index: 0
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
    switchGroup (index) {
      if (this.message.hasOwnProperty('student_group')) {
        this.switch_index = 1
        this.content = this.message.student_group[index]
      } else if (this.message.hasOwnProperty('teacher_group')) {
        this.switch_index = 0
        this.content = this.message.teacher_group[index]
      }
    },
    switchJoin (index) {
      this.content = this.message.join[index]
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
