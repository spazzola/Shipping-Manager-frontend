<template>
  <nav-menu></nav-menu>
  <user-menu></user-menu>
  <div class="content">
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Imię:</div>
      <div class="col-2 col-content">{{ name }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Nazwisko:</div>
      <div class="col-2 col-content">{{ surname }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Email</div>
      <div class="col-2 col-content">{{ email }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Login</div>
      <div class="col-2 col-content">{{ login }}</div>
    </div>
  </div>

  <div class="row row-top-margin">
    <div class="col-2 offset-5"></div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import UserMenu from "./UserMenu.vue";

export default {
  components: {
    NavMenu,
    UserMenu,
  },
  props: ["id"],
  data() {
    return {
      selectedUser: null,
    };
  },
  computed: {
    currentUser() {
      if (this.$store.getters["admin/getUser"] === null) {
        return this.selectedUser;
      } else {
        return this.$store.getters["admin/getUser"];
      }
    },
    name() {
      return this.currentUser.name;
    },
    surname() {
      return this.currentUser.surname;
    },
    email() {
      return this.currentUser.email;
    },
    login() {
        return this.currentUser.login;
    }
  },
  created() {
      console.log(this.id)
    this.selectedUser= this.$store.getters[
      "admin/getAllUsers"
    ].find((user) => user.id === parseInt(this.id));
  }
};
</script>

<style scoped>
.content {
  width: 100%;
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

.col-title {
  text-align: right;
  font-weight: bold;
}

.col-content {
  text-align: left !important;
}

.row-top-margin {
  margin-top: 1%;
}

.btn {
  margin-left: 5%;
}
</style>