<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">

    <Form :model="this.join.works">
    <FormItem label="作评名称">
      <Input v-model="this.join.works.worksName"></Input>
    </FormItem>
    <FormItem label="竞赛名称">
      <Input v-model="this.join.competition.name"></Input>
    </FormItem>
    <FormItem label="指导老师1">
      <Input v-model="this.join.teacherId1"></Input>
    </FormItem>
    <FormItem label="指导老师1">
      <Input v-model="this.join.teacherId2"></Input>
    </FormItem>
  </Form>

    <div slot="footer">
      <div>拖拽</div>
    </div>
  </Modal>
</template>

<script>
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
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
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
        return this.getter.getEditJoin
      },
      set (val) {
        this.$store.dispatch('setEditJoin', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
