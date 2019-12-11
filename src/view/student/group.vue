<template>
  <div>
    <PageHeader/>
    <Row>
      <Col span="15">
        <JoinCard/>
        <WorksCard/>
        <InfoCard/>
      </Col>
      <Col offset="1" span="8">
        <ActionCard/>
        <GroupMemberCard/>
      </Col>
    </Row>
  </div>
</template>

<script>
import PageHeader from '@/view/student/components/header/PageHeader'
import JoinCard from '@/view/student/components/card/join-card'
import InfoCard from '@/view/student/components/card/info-card'
import WorksCard from '@/view/student/components/card/works-card'
import GroupMemberCard from '@/view/student/components/card/group-member-card'
import ActionCard from '@/view/student/components/card/action-card'

export default {
  name: 'stu_group',
  components: { PageHeader, JoinCard, InfoCard, WorksCard, GroupMemberCard, ActionCard }
}
</script>

<style scoped>

</style>
