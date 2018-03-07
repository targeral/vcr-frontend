<template>
<div>
	hello world	{{ name }}
  {{ readme }}  
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      name: 'targeral11',
      readme: ''
    }
  },
  mounted () {
    this.$http.get('https://api.github.com/repos/targeral/vcr-backend/readme').then((res) => {
      this.readme = res
    })
  }
}
</script>

<style lang="less">

</style>
