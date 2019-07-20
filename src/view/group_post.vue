<template>
  <div>
    <markdown-editor v-model="content"/>
  </div>
</template>

<script>
import MarkdownEditor from '_c/markdown'
export default {
  name: 'group_post',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>
