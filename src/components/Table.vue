<template>
  <section>
    <!-- User Interface Filter -->
    <div class="px-4 py-2">
    <b-row>
    <!--- Sort -->
    <b-col lg="6" class="my-1">
      <b-form-group 
        label="Per page"
        label-for="per-page-select"
        class="mb-3"
      >
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          size="sm"
        ></b-form-select>
      </b-form-group>
    </b-col>
      <!-- Search -->
    <b-col lg="6" class="my-1">
      <b-form-group
            label="Filter"
            label-for="filter-input"
            class="mb-3"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
    </b-col>
    </b-row>
    <b-row>
    <b-col lg="6" class="my-1">
      <!--- Pagination Sort -->
      <b-pagination
          class=""
          v-model="currentPageSort"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
        ></b-pagination>
        </b-col>
    </b-row>
    </div>
    <!--- Table -->
    <div class="px-4 py-2">
      <b-table
        striped 
        hover
        :items="items"
        :filter="filter"
        :fields="fields"
        :per-page="perPage"
        table-variant="dark"
        :current-page="currentPageSort"
        @filtered="onFiltered"
        fixed="true"
        label-sort-asc
        label-sort-clear
        label-sort-desc
      ></b-table>
    </div>
    <!--- Pagination -->
    <div class="px-4 py-2">
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="lastPage"
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
      currentPage: 1,
      currentPageSort: 1,
      totalRows: 1,
      pageOptions: [25, 50, 75, 100],
      items: [],
      links: {},
      lastPage: 1,
      scrollTimer: 0,
      scrollY: 0,
      search: "",
      filter: null,
      fields: [
        {
          key: "id",
          sortable: false,
        },
        {
          key: "name",
          sortable: true,
        },
        {
          key: "country",
          sortable: true,
        },
        {
          key: "continent",
          sortable: true,
        },
        {
          key: "coordinates",
          sortable: false,
        },
      ],
    }
  },
  created () {
    this.getPage(this.currentPage)
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
        this.lastPage = response.data.meta.last_page
        this.perPage = response.data.meta.per_page
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
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.items.length = this.totalRows
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
      });
    },
  },
  updated() {
    this.totalRows = this.items.length
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
select {
  width: 100%;
  padding: 0.5rem 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid #ced4da;
}
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