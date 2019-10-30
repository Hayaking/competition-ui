<template>
  <div>
    <Row>
      <Col span="7">
        <Card title="个人设置" icon="ios-options" :padding="0" shadow >
          <CellGroup>
            <Cell title="基本设置" label="个人账户信息设置" :selected="true"></Cell>
            <Cell title="安全设置" label="密码、邮箱等设置" :selected="false"></Cell>
          </CellGroup>
        </Card>
      </Col>
      <Col span="16" offset="1">
        <InfoCard />
        <SecurityCard />
      </Col>
    </Row>
  </div>
</template>

<script>
import InfoCard from '@/view/common/components/card/info-card'
import SecurityCard from '@/view/common/components/card/security-card'
export default {
  name: 'edit_self',
  components: { InfoCard, SecurityCard }
}
</script>

<style scoped>

</style>
