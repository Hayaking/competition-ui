<template>
  <div>
    <Row>
      <Col span="7">
        <Card title="个人设置" icon="ios-options" :padding="0" shadow >
          <CellGroup @on-click="switchCell">
            <Cell title="基本设置" name="0" label="个人账户信息设置" ></Cell>
            <Cell title="安全设置" name="1" label="密码、邮箱等设置" ></Cell>
          </CellGroup>
        </Card>
      </Col>
      <Col span="16" offset="1">
        <InfoCard v-if="index ===0"/>
        <SecurityCard v-else-if="index===1"/>
      </Col>
    </Row>
  </div>
</template>

<script>
import InfoCard from '@/view/common/components/card/info-card'
import SecurityCard from '@/view/common/components/card/security-card'
import { mapGetters, mapMutations } from 'vuex'
import { getUserInfo } from '@/mock/login'
export default {
  name: 'edit_self',
  components: { InfoCard, SecurityCard },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),
    switchCell (name) {
      this.index = Number.parseInt(name)
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    self: {
      get () {
        return getUserInfo
      },
      set (val) {
        this.setUser(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
