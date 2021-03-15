<template>
  <nav-menu></nav-menu>
  <driver-menu></driver-menu>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Imię i nazwisko kierowcy</th>
          <th scope="col">Tablice rejestracyjne</th>
          <th scope="col">Numer(y) telefonów</th>
        </tr>
      </thead>
    </table>

    <div>
      <driver-item
        v-for="driver in allDrivers"
        :key="driver.id"
        :id="driver.id"
        :name="driver.name"
        :surname="driver.surname"
        :plates="driver.plates"
        :phoneNumbers="driver.phoneNumbers"
      ></driver-item>
    </div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import DriverItem from "./DriverItem.vue";
import DriverMenu from "./DriverMenu.vue";

export default {
  components: {
    NavMenu,
    DriverItem,
    DriverMenu
  },
  computed: {
    allDrivers() {
      return this.$store.getters["drivers/getAllDrivers"];
    },
  },
  created() {
    this.$store.dispatch("drivers/loadDrivers");
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
  width: 25%;
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