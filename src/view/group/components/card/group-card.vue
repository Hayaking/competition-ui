<template>
  <Card title="小组" style="margin-bottom: 18px">
    {{this.group}}
  </Card>
</template>

<script>
export default {
  name: 'group-card',
  props: {
    group: { Object }
  }
}
</script>

<style scoped>

</style>
