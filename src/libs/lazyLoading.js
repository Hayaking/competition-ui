export default (url) => {
  if (url === 'Main') {
    return (require(`@/components/main/main.vue`)).default
  }
  console.info(url)
  return (require(`@/view/${url}.vue`)).default
}
