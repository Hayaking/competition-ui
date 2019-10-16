<template>
  <div>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">比赛简介：</span>
        <span class="expand-value">{{ row.intro }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">比赛流程：</span>
        <span class="expand-value">{{ row.process }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key">预期成果：</span>
        <span class="expand-value">{{ row.exRes }}</span>
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
        <span class="expand-value">{{ row.stuNum }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">预期参赛队伍数: </span>
        <span class="expand-value">{{ row.groupNum }}</span>
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
        <span class="expand-value">{{ row.joinTypeId }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="6">
        <span class="expand-key">比赛地点：</span>
        <span class="expand-value">{{ row.place}}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">负责人：</span>
        <span class="expand-value">{{ row.personInCharge }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">立项者: </span>
        <span class="expand-value">{{ row.creator }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">立项工作组: </span>
        <span class="expand-value">{{ row.teacherGroupId }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
import { dateFomat } from '@/libs/tools'
export default {
  name: 'competition-expand',
  props: {
    row: Object
  },
  computed: {
    startTime () {
      return dateFomat(this.row.startTime)
    },
    endTime () {
      return dateFomat(this.row.endTime)
    },
    enterStartTime () {
      return dateFomat(this.row.enterStartTime)
    },
    enterEndTime () {
      return dateFomat(this.row.enterEndTime)
    }
  }
}
</script>

<style scoped>

</style>
