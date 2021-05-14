<template>
  <nav-menu></nav-menu>
  <user-menu></user-menu>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Imię</th>
          <th scope="col">Nazwisko</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
    </table>

    <div>
      <user-item
        v-for="user in allUsers"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :surname="user.surname"
        :email="user.email"
      ></user-item>
    </div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import UserMenu from "./UserMenu.vue";
import UserItem from "./UserItem.vue";

export default {
  components: {
    NavMenu,
    UserMenu,
    UserItem
  },
  computed: {
      allUsers() {
          return this.$store.getters["admin/getAllUsers"]
      }
  },
  created() {
    this.$store.dispatch("admin/loadUsers");
  }
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
table th:nth-child(5){
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