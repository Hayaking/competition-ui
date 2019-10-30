<template>
  <div>
    <PageHeader/>
    <Row>
      <Col span="15">
        <JoinCard />
        <WorksCard />
        <InfoCard />
      </Col>
      <Col span="8" offset="1">
        <ActionCard :groupList="page.records"/>
        <GroupMemberCard />
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PageHeader from '@/view/student/components/header/PageHeader'
import JoinCard from '@/view/student/components/card/join-card'
import InfoCard from '@/view/student/components/card/info-card'
import WorksCard from '@/view/student/components/card/works-card'
import GroupMemberCard from '@/view/student/components/card/group-member-card'
import ActionCard from '@/view/student/components/card/action-card'
export default {
  name: 'stu_group',
  components: { PageHeader, JoinCard, InfoCard, WorksCard, GroupMemberCard, ActionCard },
  data () {
    return {
      page: {
        current: 1,
        size: 12,
        total: 0,
        records: []
      },
      TABLE_HEAD: [
        {
          title: '组名',
          key: 'name'
        },
        {
          title: '组长',
          slot: 'creator'
        },
        {
          title: '作品名',
          key: 'worksName'
        }
      ]
    }
  },
  mounted () {
    this.getGroupPage()
  },
  methods: {
    ...mapActions([
      'handleGetStudentGroup'
    ]),
    getGroupPage (pageNum = 1, pageSize = 12) {
      this.handleGetStudentGroup({ pageNum, pageSize }).then(res => {
        this.page = res
      })
    },
    pageChange (index) {
      this.page.current = index
      this.getGroupPage(index, this.page.size)
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
