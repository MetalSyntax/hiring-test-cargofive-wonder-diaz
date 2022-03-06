<template>
  <section>
    <!-- User Interface Filter -->
    <div class="px-4 pb-2 pt-5">
    <b-row>
    <!--- Sort Items -->
    <b-col lg="6" class="my-1">
      <b-form-group 
        label="Items Per page"
        label-for="per-page-select"
        class="mb-3"
      >
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
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
      <b-form-group
          label="Internal pagination"
          label-for="sort-by-pagination"
          class="mb-3"
        >
          <b-pagination
            v-model="currentPageSort"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
          ></b-pagination>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <!--- Sort Asc/Des -->
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          v-slot="{ ariaDescribedby }"
          class="mb-3"
        >
          <b-input-group>
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptionsSelect"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <!--- Visible columns in the table-->
        <b-form-group
          label="Group Selector"
          v-slot="{ ariaDescribedby }"
          class="checkbox"
        >
          <b-form-checkbox
            :disabled="visibleFields.length == 1 && field.visible"
            v-for="field in fields" 
            :key="field.key" 
            v-model="field.visible" 
            :aria-describedby="ariaDescribedby"
          >
            {{ field.key }}
          </b-form-checkbox>
        </b-form-group>
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
        :fields="visibleFields"
        :per-page="perPage"
        table-variant="dark"
        :current-page="currentPageSort"
        @filtered="onFiltered"
        fixed="true"
        label-sort-clear
        label-sort-asc
        label-sort-desc
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
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
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      sortOptionsSelect: ["name","country","continent"],
      filter: null,
      fields: [
        {
          key: "id",
          sortable: false,
          visible: false
        },
        {
          key: "name",
          sortable: true,
          visible: true
        },
        {
          key: "country",
          sortable: true,
          visible: true
        },
        {
          key: "continent",
          sortable: true,
          visible: true
        },
        {
          key: "coordinates",
          sortable: false,
          visible: true
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
    // Get the current page
    getPage(page) {
      const axiosInstance = axios.create({
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      axiosInstance.get(`${this.baseURL}?page=${page}`)
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
    // Load next page
    loadPage(pageNum) {
      this.getPage(pageNum)
      this.filter = ''
    },
    // Back to top 
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
    // Total Row Count using Filter
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.items.length = this.totalRows
    }
  },
  computed: {
    // Search/Filter logic
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
      });
    },
    // Visible Fields in the table
    visibleFields() {
      return this.fields.filter(field => field.visible)
    }
  },
  updated() {
    this.totalRows = this.items.length
  }
}
</script>

<style>
select {
  width: 100%;
  padding: 0.45rem 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid #ced4da;
}
.page-item.active .page-link {
  background-color: #031B4E;
  border-color: #031B4E;
}
.page-link {
  color: #212529;
}
.page-link:hover {
  color: #042261;
}
.table-dark {
  --bs-table-bg: #031B4E;
  --bs-table-striped-bg: #02143b;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #02143b;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #02143b;
  --bs-table-hover-color: #fff;
  color: #fff;
  border-color: #042261;
}
.pt-5 {
  padding-top: 4em !important;
}
.checkbox > div {
  display: flex;
}
.custom-control-label {
  padding-left: 5px;
}
.custom-checkbox {
  margin-right: 10px;
  text-align: center;
}
</style>