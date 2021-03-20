<template>
  <nav-menu></nav-menu>
  <driver-menu></driver-menu>
  <driver-form @driver-data="submitForm" :buttonText="'Zapisz'"></driver-form>
</template>

<script>
import DriverMenu from "../drivers/DriverMenu.vue";
import NavMenu from "../nav/NavMenu.vue";
import DriverForm from './DriverForm.vue';

export default {
  components: {
    NavMenu,
    DriverMenu,
    DriverForm
  },

  methods: {
    async submitForm(driver) {
      await this.$store.dispatch("drivers/addDriver", driver);
      this.$router.replace("/drivers");
    }
  }
};
</script>

<style scoped>
.row {
  margin-top: 1rem;
}
</style>
