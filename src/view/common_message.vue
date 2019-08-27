<template>
    <div class="demo-split">
      <Split v-model="split">
        <div slot="left" class="left-split-pane">
          <Card :padding="0" title="消息列表">
            <CellGroup @on-click="switchGroup">
              <Cell v-for="(item,index) in message.group"
                    :key="item.id"
                    :name="index"
                    :title="item.groupName" />
            </CellGroup>
            <CellGroup @on-click="switchJoin">
              <Cell v-for="(item,index) in message.join"
                    :key="item.id"
                    :name="index"
                    :title="item.groupName" />
            </CellGroup>
          </Card>
        </div>
        <div slot="right" class="demo-split-pane">
          <InviteMessage :content="content" style="margin: 15px"></InviteMessage>
        </div>
      </Split>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import InviteMessage from '@/view/components/invite-message'

export default {
  name: 'message',
  components: { InviteMessage },
  data () {
    return {
      split: 0.3,
      message: new Map(),
      group: [],
      content: null
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
      this.content = this.message.group[index]
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
