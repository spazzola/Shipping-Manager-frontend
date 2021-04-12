<template>
  <div class="row">
    <div class="col-7">
      <nav class="navbar navbar-expand-xl">
        <div class="nav-item my-right-border col-xl-3">
          <router-link
            class="nav-link block"
            active-class="active"
            to="/orders"
          >
            <i class="fas fa-file-invoice"></i>Zamówienia</router-link
          >
        </div>
        <div class="nav-item my-right-border col-xl-3">
          <router-link class="nav-link" active-class="active" to="/invoices"
            ><i class="fas fa-file-invoice-dollar"></i>Faktury</router-link
          >
        </div>
        <div class="nav-item my-right-border col-xl-3">
          <router-link class="nav-link" active-class="active" to="/companies"
            ><i class="fas fa-users"></i>Kontrahenci</router-link
          >
        </div>
        <div class="nav-item col-xl-3">
          <router-link class="nav-link" active-class="active" to="/drivers"
            ><i class="fas fa-truck-moving"></i>Kierowcy</router-link
          >
        </div>
        <div class="nav-item my-left-border col-xl-4" v-if="isAdmin">
          <router-link
            class="nav-link"
            active-class="active"
            to=""
            ><i class="fas fa-user-cog"></i>Panel administratora</router-link
          >
        </div>
      </nav>
    </div>
  </div>
  <hr />
</template>

<script>
export default {
  computed: {
    isAdmin() {
      let role = localStorage.getItem("role");
      if (role === "ADMIN") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.test {
  text-align: right;
}

hr {
  margin: 0;
}

.navbar,
a {
  color: #ff9a00;
  width: 100%;
}

.block {
  display: inline-block;
}

a:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
}

.item:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
  width: 100%;
}

i {
  color: #ff9a00 !important;
  margin-right: 10%;
}
nav {
  margin-top: 1rem;
  font-size: 1.3rem;
}

.my-right-border {
  border-right: inset 1px #ff9a00;
  height: 10%;
  position: relative;
}

.my-left-border {
  border-left: solid 1px #ff9a00;
  height: 10%;
  position: relative;
}

nav {
  margin-left: 0.8%;
}

.nav-link,
.nav-item {
  padding: 0;
}

</style>