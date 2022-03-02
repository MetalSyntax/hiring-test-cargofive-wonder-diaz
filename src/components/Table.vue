<template>
  <section>
    <b-table striped hover :items="items"></b-table>
  </section>
</template>

<script>
import axios from 'axios'
let url = 'http://apitest.cargofive.com/api/ports'
export default {
  name: 'Table',
  data() {
    axios.get(url)
    .then(response => {
        this.items = response.data.data
    })
    .catch(error => {
        console.log(error)
    })
    return {
      items: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
