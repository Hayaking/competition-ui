<template>
  <List>
    <div v-for="(item,index) in competitionList" :key="index">
      <ListItem>
        <ListItemMeta :title="item.title"
                      :description="item.description" />
        <template slot="action">
          <li>
            <a href="">参赛</a>
          </li>
          <li>
            <a href="">查看</a>
          </li>
        </template>
      </ListItem>
    </div>
  </List>
</template>

<script>
export default {
  name: 'competition-list',
  props: {
    competitionList: Array
  }
}
</script>

<style scoped>

</style>
