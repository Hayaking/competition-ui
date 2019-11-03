<template>
  <Form :model="works"  style="width: 300px">
    <FormItem label="作品名">
        <Input type="text" v-model="works.worksName" placeholder="输入作品名"/>
    </FormItem>
    <FormItem label="作品介绍：">
      <Input type="textarea"  v-model="works.des" placeholder="作品介绍"/>
    </FormItem>
  </Form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'join-form3',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
      'setEnterHolderWorks'
    ]),
    submit () {
      this.$emit('on-success-valid', true)
    }
  },
  computed: {
    ...mapGetters([
      'getEnterHolder'
    ]),
    works: {
      get () {
        return this.getEnterHolder.works
      },
      set (val) {
        this.setEnterHolderWorks(val)
      }
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
