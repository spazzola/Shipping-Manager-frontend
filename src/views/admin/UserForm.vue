<template>
  <base-alert v-if="showAlert" title="Błąd">
    <template #default>
      <p>Sprawdź czy wszystkie pola zostały uzupełnione</p>
    </template>
    <template #actions>
      <base-button
        @click="confirmAlert"
        :buttonType="'confirm'"
        :buttonText="'Ok'"
      ></base-button>
    </template>
  </base-alert>
  <div class="form-group">
    <form>
      <div class="row">
        <div class="col-2 offset-4 col-title">Imię:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            v-model.trim="user.name"
            placeholder="Imię"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Nazwisko:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            v-model.trim="user.surname"
            placeholder="Nazwisko"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Email:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="email"
            v-model.trim="user.email"
            placeholder="Email"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Login:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            v-model.trim="user.login"
            placeholder="Login"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Hasło:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="password"
            v-model.trim="user.password"
            placeholder="Hasło"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title"></div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="password"
            v-model.trim="passwordCheck"
            placeholder="Powtórz hasło"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-5">
          <button
            class="btn btn-sm btn-outline-danger"
            @click.stop.prevent="goBack"
            style="margin-right: 1rem"
          >
            Cofnij
          </button>
          <button
            class="btn btn-sm btn-outline-success"
            @click.stop.prevent="submitForm"
          >
            Zapisz
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["user-data"],
  data() {
    return {
      showAlert: false,
      user: {
        login: null,
        password: null,
        name: null,
        surname: null,
        email: null,
        role: "USER",
      },
      passwordCheck: null,
    };
  },
  methods: {
    goBack() {
      this.$router.replace("/users");
    },
    submitForm() {
      if (this.validateForm()) {
        this.$emit("user-data", this.user);
      } else {
        this.showAlert = true;
      }
    },
    passwordsMatch() {
      if (
        this.user.password === this.passwordCheck &&
        this.user.password !== null &&
        this.user.password !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    validateForm() {
      if (!this.passwordsMatch) {
        return false;
      }
      if (this.user.login === null || this.user.login === '') {
        return false;
      }
      if (this.user.name === null || this.user.name === '') {
        return false;
      }
      if (this.user.email === null || this.user.email === '') {
        return false;
      }
    },
    confirmAlert() {
      this.isConfirmed = true;
      this.showAlert = false;
    }
  },
};
</script>

<style scoped>
.col-title {
  text-align: right;
  font-weight: bold;
}

.col-content {
  text-align: left !important;
}

.row {
  margin-top: 1rem;
}

.row-top-margin {
  margin-top: 2rem;
}
</style>