<template>
  <a-descriptions title="Responsive Descriptions" bordered :column="2">
    <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
    <a-descriptions-item label="Billing">Prepaid</a-descriptions-item>
    <a-descriptions-item label="Time">18:00:00</a-descriptions-item>
    <a-descriptions-item label="Amount">$80.00</a-descriptions-item>
    <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
    <a-descriptions-item label="Official">$60.00</a-descriptions-item>
    <a-descriptions-item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
    </a-descriptions-item>
  </a-descriptions>
  <router-view></router-view>
</template>

<script>
  import HelloWorldVue from './hello_world.vue'
  export default {
    name: 'App',
    setup() {
      // return {
      //   open: () => {
      //     window.open('https://antdv.com', '_blank')
      //   },
      // }
    },
    components: {
      HelloWorld: HelloWorldVue,
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
