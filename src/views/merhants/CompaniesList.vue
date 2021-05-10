<template>
  <nav-menu></nav-menu>
  <company-menu></company-menu>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>

          <th scope="col">Nazwa firmy</th>
          <th scope="col">NIP</th>
          <th scope="col">REGON</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
    </table>

    <div v-if="!showBackButton">
      <company-item
        v-for="company in allCompanies"
        :key="company.id"
        :id="company.id"
        :companyName="company.companyName"
        :nip="company.nip"
        :regon="company.regon"
        :email="company.email"
      ></company-item>
    </div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu";
import CompanyMenu from "./CompanyMenu.vue";
import CompanyItem from "./CompanyItem.vue";

export default {
  components: {
    NavMenu,
    CompanyMenu,
    CompanyItem,
  },
  data() {
    return {
      showBackButton: false,
    };
  },
  computed: {
    allCompanies() {
      let companiesList = this.$store.getters["companies/getAllCompanies"];
      return this.removeMainCompany(companiesList);
    },
  },
  methods: {
    removeMainCompany(companiesList) {
      for (var i = 0; i < companiesList.length; i++) {
        if (companiesList[i].mainCompany === true) {
          companiesList.splice(i, 1);
        }
      }
      return companiesList;
    },
  },
  created() {
    this.$store.dispatch("companies/loadCompanies");
  },
};
</script>

<style scoped>
.content {
  position: relative;
  margin: 2% 0 0 1%;
  text-align: left;
  width: 98%;
  margin-right: 5%;
  overflow-x: scroll;
}

table {
  width: 100%;
  table-layout: fixed;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6) {
  width: 25%;
}

td,
th {
  width: 13%;
  overflow: hidden;
}

.btn-outline-success {
  border-color: #3ec1d3;
  color: #3ec1d3;
}

.btn-outline-success:hover {
  background-color: #ff9a00;
  color: #f6f7d7;
  border-color: #ff9a00;
}

.btn-remove {
  margin-right: 5%;
  font-size: 1rem;
  color: red !important;
}
</style>