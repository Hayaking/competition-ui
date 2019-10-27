<template>
  <List>
    <ListItem>
      <ListItemMeta
        avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
        title="This is title"
        description="This is description, this is description." />
      <template slot="action">
        <li>
          <a href="">参赛</a>
        </li>
        <li>
          <a href="">查看</a>
        </li>
      </template>
    </ListItem>
  </List>
</template>

<script>
export default {
  name: 'competition-list'
}
</script>

<style scoped>

</style>
