<template>
    <Card>
      <markdown-it-vue class="md-body" :content="content" />
    </Card>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  name: 'common-post-page',
  components: {
    MarkdownItVue
  },
  data () {
    return {
      content: '# your markdown content\n## haha'
    }
  }
}
</script>

<style scoped>

</style>
