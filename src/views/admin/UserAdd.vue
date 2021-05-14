<template>
  <nav-menu></nav-menu>
  <user-menu></user-menu>
  <user-form @user-data="submitForm"></user-form>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import UserMenu from "./UserMenu.vue";
import UserForm from "./UserForm.vue";

export default {
  components: {
    NavMenu,
    UserMenu,
    UserForm,
  },
  methods: {
    async submitForm(user) {
      await this.$store.dispatch("admin/addUser", user);
      this.$router.replace("/users");
    },
  },
};
</script>