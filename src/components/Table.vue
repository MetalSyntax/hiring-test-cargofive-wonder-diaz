<template>
  <section class="overflow-auto">
    <!--- Sortable Dropdown Buttons -->
    <div class="px-4 py-2">
      <b-dropdown variant="dark" text="Filter" class="m-md-2">
        <b-dropdown-item @click="CountrySorted">Sort by Country</b-dropdown-item>
        <b-dropdown-item @click="ContinentSorted">Sort by Continent</b-dropdown-item>
        <b-dropdown-item @click="Display100ResultPerPage">Display 100 items</b-dropdown-item>
        <b-dropdown-item @click="Display50ResultPerPage">Display 50 items</b-dropdown-item>
        <b-dropdown-item @click="Display25ResultPerPage">Display 25 items</b-dropdown-item>
      </b-dropdown>
    </div>
    <!--- Table Sort -->
    <div class="px-4 py-2">
      <b-table v-show="perPage < 100"
        striped 
        hover
        :items="items"
        :per-page="ByPage"
        :current-page="currenByPage"
        table-variant="dark"
      ></b-table>
    </div>
    <!--- Table Full per Page -->
    <div class="px-4 py-2">
      <b-table v-show="perPage > 50"
        striped 
        hover
        :items="items"
        :per-page="perPage"
        table-variant="dark"
      ></b-table>
    </div>
    <!--- Pagination Sort -->
    <div v-show="perPage < 100" class="px-4 py-2">
      <b-pagination
        v-model="currenByPage"
        :total-rows="rows"
        :per-page="ByPage"
        align="center"
      ></b-pagination>
    </div>
    <!--- Pagination -->
    <div class="px-4 py-2">
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
      >
      </b-pagination-nav>
      <!-- Back to top -->
      <b-button 
        v-show="scrollY > 300" 
        @click="scrollToTop" 
        style="height: 50px;right: 10px; bottom: 10px;" 
        class="rounded-circle position-fixed" 
        variant="light" 
        title="Back to top">
          <b-icon 
            font-scale="1.5" 
            variant="dark" 
            icon="arrow-up-circle-fill" 
            aria-hidden="true"></b-icon>
      </b-button>
    </div>
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
      ByPage: 50,
      currenPage: 1,
      currenByPage: 1,
      items: [],
      links: {},
      last: 1,
      scrollTimer: 0,
      scrollY: 0
    }
  },
  created () {
    this.getPage(this.currenPage)
  },
  mounted() {
      window.addEventListener('scroll', this.handleScroll);
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
    },
    handleScroll() {
      if (this.scrollTimer) return;
      this.scrollTimer = setTimeout(() => {
        this.scrollY = window.scrollY;
        clearTimeout(this.scrollTimer);
        this.scrollTimer = 0;
      }, 200);
    },
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    CountrySorted() {
        return this.items.sort((a, b) => {
            return a.country.localeCompare(b.country);
        });
    },
    ContinentSorted() {
        return this.items.sort((a, b) => {
            return a.continent.localeCompare(b.continent);
        });
    },
    Display100ResultPerPage() {
      return this.perPage = 100
    },
    Display50ResultPerPage() {
      this.perPage = 50
      this.ByPage = 50
      return {
        'perPage': this.perPage,
        'ByPage': this.ByPage
      }
    },
    Display25ResultPerPage() {
      this.perPage = 25
      this.ByPage = 25
      return {
        'perPage': this.perPage,
        'ByPage': this.ByPage
      }
    },
  },
  computed: {
    rows() {
      return this.items.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page-item.active .page-link {
  background-color: #212529;
  border-color: #212529;
}
.page-link {
  color: #212529;
}
.page-link:hover {
  color: #212529;
}
</style>
