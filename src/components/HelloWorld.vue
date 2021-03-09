<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img src="../assets/200.gif" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  .hello h1 {
    width: 400px;
  }
  .hello img {
    width: 400px;
  }
</style>
