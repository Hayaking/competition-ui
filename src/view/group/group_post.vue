<template>
  <Card>
    <PostSelectModal
      :show="show"
      @ok="cancelModal"
      @cancel="cancelModal"
    />
    <label>
      <Input v-model="post.title"/>
    </label>
    <markdown-editor v-model="post.body"/>
    <Button @click="submit">提交</Button>
  </Card>
</template>

<script>
import MarkdownEditor from '_c/markdown'
import PostSelectModal from '@/view/components/modal/post-select-modal'
export default {
  name: 'group_post',
  components: {
    MarkdownEditor,
    PostSelectModal
  },
  data () {
    return {
      show: false,
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    submit () {
      this.show = true
      console.info(this.show)
      console.info(this.post)
    },
    cancelModal () {
      console.info(this.show)
      this.show = false
    }

  }
}
</script>

<style scoped>

</style>
