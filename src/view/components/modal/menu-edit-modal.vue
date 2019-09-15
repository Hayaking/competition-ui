<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">
    <Form :model="menu" label-position="left">
      <FormItem label="名字" prop="name">
        <Input v-model="menu.name"></Input>
      </FormItem>
      <FormItem label="路径" prop="path">
        <Input v-model="menu.path"></Input>
      </FormItem>
      <FormItem label="组件名" prop="component">
        <Input v-model="menu.component"></Input>
      </FormItem>
    </Form>
    <Form :model="meta" label-position="left" ref="metaForm">
      <FormItem label="图标" prop="icon">
        <Input v-model="meta.icon" ref="icon"></Input>
      </FormItem>
      <FormItem label="隐藏" prop="hideInMenu">
        <Input v-model="meta.hideInMenu" ref="hideInMenu"></Input>
      </FormItem>
      <FormItem label="标题" prop="title">
        <Input v-model="meta.title" ref="title"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="newMeta">新建Meta</Button>
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'menu-edit-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      menu: { meta: {} },
      meta: {}
    }
  },
  methods: {
    ...mapActions([
      'handleSaveMenu'
    ]),
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.menu.meta = this.meta
      this.handleSaveMenu({ menu: this.menu }).then(res => {
        if (res) {
          this.$Message.success('成功')
        } else {
          this.$Message.error('失败')
        }
      })
      this.$emit('cancel')
    },
    newMeta () {
      this.$refs.metaForm.resetFields()
      this.meta = {}
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    }
  },
  watch: {
    modalShow (val) {
      if (val) {
        this.menu = this.getter.getEditMenu
        this.meta = this.getter.getEditMenu.meta
        this.meta.id = this.menu.metaId
      }
    }
  }
}
</script>

<style scoped>

</style>
