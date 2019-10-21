<template>
  <Form ref="formDynamic"  :model="works" :label-width="80" style="width: 300px">
    <FormItem label="作品名">
      <Row>
        <Col span="18">
          <Input type="text" v-model="works.worksName" placeholder="输入作品名"></Input>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'join-form3',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      works: {}
    }
  },
  methods: {
    submit () {
      this.$emit('on-success-valid', true, this.works)
    }
  },
  watch: {
    flag (newVal) {
      if (newVal) {
        this.submit()
      }
    }
  }
}
</script>

<style scoped>

</style>
