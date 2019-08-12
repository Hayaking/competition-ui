<template>
  <div>
    <Table :columns="tb_head" :data="tb_res"></Table>
  </div>

</template>

<script>
export default {
  name: 'competition-card',
  data () {
    return {
      tb_head: [
        {
          title: '竞赛名',
          key: 'name'
        }, {
          title: '竞赛级别',
          key: 'type'
        }, {
          title: '操作'
        }
      ],
      tb_res: []
    }
  }
}
</script>

<style scoped>

</style>
