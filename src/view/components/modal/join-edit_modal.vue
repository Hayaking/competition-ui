<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">

    <Form :model="join">
    <FormItem label="作品名称">
      <Input v-model="join.works.worksName"></Input>
    </FormItem>
    <FormItem label="竞赛名称">
      <Input v-model="join.competition.name"></Input>
    </FormItem>
    <FormItem label="指导老师1">
      <Input v-model="join.teacherId1"></Input>
    </FormItem>
    <FormItem label="指导老师2">
      <Input v-model="join.teacherId2"></Input>
    </FormItem>
  </Form>

  </Modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'join-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getter: this.$store.getters
    }
  },
  methods: {
    ...mapMutations([
      'setEditJoin'
    ]),
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    ...mapGetters([
      'getEditJoin'
    ]),
    modalShow: {
      get () {
        // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-side-effects-in-computed-properties
        this.$store.dispatch('handleGetRoleList').then(res => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.right = res
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.left = this.userRoles
        })
        return this.show
      },
      set (val) {
        console.info(val)
      }
    },
    join: {
      get () {
        return this.getEditJoin
      },
      set (val) {
        this.setEditJoin(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
