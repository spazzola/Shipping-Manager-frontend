<template>
  <div class="content">
    <img src="../assets/logo.png" />
    <div class="row justify-content-center">
      <form class="col-2" @submit.prevent="submitForm">
        <div class="form-group">
          <input
            type="text"
            v-model.trim="login"
            class="form-control"
            placeholder="Login"
          />
        </div>

        <div>
          <input
            type="password"
            v-model.trim="password"
            class="form-control"
            placeholder="Hasło"
          />

          <button type="submit" class="btn btn-primary btn-md">Zaloguj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.login === "") {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        login: this.login,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "orders");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
  },
};
</script>


<style scoped>
.content {
  margin-top: 15%;
}

img {
  margin-bottom: 2%;
  width: 15%;
}
.btn {
  margin-top: 3%;
  background-color: #3ec1d3;
}
</style>
