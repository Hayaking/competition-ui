<template>
  <Card title="作品" style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      作品
    </div>
    <div v-if="worksList.length===0">
      <Divider>
        <div style="color:#9ea7b4;font-size: 12px">什么都没有</div>
      </Divider>
    </div>
    <div v-else>
      <List>
        <ListItem v-for="(item,index) in worksList"
                  :key="index"
                  v-if="item.creator !== undefined">
          <ListItemMeta :title='"作品名："+ item.worksName'
                        :description='"创建者："+item.creator.stuName +"，描述："+item.des'/>
          <template slot="action">
            <!--          <tag color="success">通过审核</tag>-->
          </template>
        </ListItem>
      </List>
    </div>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'join-card',
  data () {
    return {
      worksList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetWorksList'
    ]),
    getWorksList (id) {
      this.handleGetWorksList({ groupId: id }).then(res => {
        this.worksList = res.body
      })
    }
  },
  computed: {
    ...mapGetters([
      'getStudentGroup'
    ]),
    group: {
      get () {
        return this.getStudentGroup
      },
      set (val) {
        this.setStudentGroup(val)
      }
    }
  },
  watch: {
    group: {
      handler (newVal) {
        this.getWorksList(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
