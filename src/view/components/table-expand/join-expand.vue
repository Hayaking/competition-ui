<template>
  <div>
    作品：
    <Row>
      <Col span="4">{{row.works.id}}</Col>
      <Col span="4">{{row.works.worksName}}</Col>
    </Row>

    <Row v-if="row.joinTypeId ===1">
      小组：
      <Col span="4">{{row.works.studentGroup.id}}</Col>
      <Col span="4">{{row.works.studentGroup.name}}</Col>
      <Col span="4">{{row.works.studentGroup.creator}}</Col>
      <Col span="4">{{row.works.studentGroup.createTime}}</Col>
      <Col span="4">
        <div v-for="(item,index) in row.works.studentGroup.members" :key="index">
          {{item.student.stuName}}
        </div>
      </Col>
    </Row>
    比赛信息：
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">比赛简介：</span>
        <span class="expand-value">{{ row.competition.intro }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="6">
        <span class="expand-key">报名开始时间：</span>
        <span class="expand-value">{{ enterStartTime }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">报名结束时间：</span>
        <span class="expand-value">{{ enterEndTime }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">预期参赛人数: </span>
        <span class="expand-value">{{ row.competition.stuNum }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">预期参赛队伍数: </span>
        <span class="expand-value">{{ row.competition.groupNum }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="6">
        <span class="expand-key">比赛开始时间：</span>
        <span class="expand-value">{{ startTime}}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">比赛结束时间：</span>
        <span class="expand-value">{{ endTime }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">参赛形式: </span>
        <span class="expand-value">{{ row.competition.joinTypeId }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="6">
        <span class="expand-key">比赛地点：</span>
        <span class="expand-value">{{ row.competition.place}}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">负责人：</span>
        <span class="expand-value">{{ row.competition.personInCharge }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">立项者: </span>
        <span class="expand-value">{{ row.competition.creator }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">立项工作组: </span>
        <span class="expand-value">{{ row.competition.teacherGroupId }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'

export default {
  name: 'stu-join-expand',
  props: {
    row: Object
  },
  computed: {
    startTime () {
      return dateFomat(this.row.competition.startTime)
    },
    endTime () {
      return dateFomat(this.row.competition.endTime)
    },
    enterStartTime () {
      return dateFomat(this.row.competition.enterStartTime)
    },
    enterEndTime () {
      return dateFomat(this.row.competition.enterEndTime)
    }
  }
}
</script>

<style scoped>

</style>
