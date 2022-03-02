<template>
  <main id="app">
    <NavBar />
    <Table />
  </main>
</template>

<script>
import Table from './components/Table.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    Table, NavBar
  }
}
</script>

<style>

</style>
