<template>
  <div class="row">
    <div class="col-xl-1 col-lg-2 bg" v-if="!isAddMode">
      <router-link to="/addDriver">
        <i class="fas fa-times rotate" style="color: green; margin-right: 5%;"></i>Dodaj kierowce
      </router-link>
    </div>
    <div class="col-xl-1 col-lg-2 bg" v-else>
      <router-link to="/drivers">
        <i class="fas fa-arrow-left" style="color: green; margin-right: 5%;"></i>Wstecz
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addMode: false 
    }
  },
  computed: {
    isAddMode() {
      if (this.$route.path.indexOf('drivers') > -1) {
        return false;
      }
      if (this.$route.path.indexOf('driver') > -1 || this.$route.path.indexOf('Driver')) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 0.5rem;
  font-size: 1rem;
}

a {
  color: #ff9a00 !important;
  display: block;
  width: 100%;
}

a:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
  max-width: 100%;
  text-decoration: none !important;
}

.col-1 {
  padding: 0;
}

.col-1:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
}

.col:hover {
  background-color: red;
}

.col-lg-2 {
  padding: 0 !important;
}

i {
  color: green;
  margin-right: 5%;
}

.rotate {
    transform: rotate(45deg);
}
</style>