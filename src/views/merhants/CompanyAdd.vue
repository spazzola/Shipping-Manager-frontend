<template>
  <nav-menu></nav-menu>
  <company-menu></company-menu>
  <company-form @company-data="submitForm" :buttonText="'Zapisz'"></company-form>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import CompanyMenu from "./CompanyMenu.vue";
import CompanyForm from './CompanyForm.vue';

export default {
  components: {
    NavMenu,
    CompanyMenu,
    CompanyForm
  },
  methods: {
    async submitForm(company) {
      await this.$store.dispatch("companies/addCompany", company);
      await this.$store.dispatch("companies/loadCompanies");
      this.$router.replace("/companies");
    }
  },
};
</script>

<style scoped>
.row {
  margin-top: 1rem;
}
</style>