<template>
  <section class="overflow-auto">
    <b-table
      striped 
      hover
      :items="items"
      :per-page="perPage"
    ></b-table>
      <b-pagination-nav
        v-model="currenPage"
        :number-of-pages="last"
        last-number
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
        @change="loadPage"
        use-router
      ></b-pagination-nav>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: 'Table',
  data() {
    return {
      baseURL: "http://apitest.cargofive.com/api/ports",
      perPage: 100,
      currenPage: 1,
      items: [],
      links: {},
      last: 1
    }
  },
  created () {
    this.getPage(this.currenPage)
  },
  methods: {
    getPage(page) {
      axios.get(`${this.baseURL}?page=${page}`)
      .then(response => {
        this.items = response.data.data
        this.links = response.data.links
        this.last = response.data.links.last.replace(`${this.baseURL}?page=`, '')
      })
      .catch(error => {
        console.log(error)
      })
    },
    loadPage(pageNum) {
      this.getPage(pageNum)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
