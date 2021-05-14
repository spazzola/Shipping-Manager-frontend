<template>
  <base-alert v-if="showAlert" title="Potwierdź czynność">
    <template #default>
      <p>Czy napewno chcesz usunać użytkownika?</p>
    </template>
    <template #actions>
      <base-button @click="confirmAlert" :buttonType="'confirm'" :buttonText="'Tak'"></base-button>
      <base-button @click="rejectAlert" :buttonType="'reject'" :buttonText="'Nie'"></base-button>
    </template>
  </base-alert>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <td scope="row">
            <button class="btn btn-sm btn-remove" @click="deleteUser">
              <i class="fas fa-times"></i>
            </button>

            <router-link :to="userEditLink"
              ><button
                class="btn btn-sm btn-outline-success"
                style="float: right"
              >
                Szczegóły
              </button>
            </router-link>
          </td>
          <td scope="row">{{ name }}</td>
          <td scope="row">{{ surname }}</td>
          <td scope="row">{{ email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "surname", "email"],
  data() {
    return {
      showAlert: false,
      isConfirmed: false
    };
  },
  computed: {
    userEditLink() {
      return "/user/" + this.id;
    },
  },
  methods: {
    async deleteUser() {
      this.showAlert = true;
      if (this.isConfirmed) {
        await this.$store.dispatch("admin/deleteUser", this.id);
        await this.$store.dispatch("admin/loadUsers");
        this.$router.replace("/users");
      }
    },
    confirmAlert() {
      this.isConfirmed = true;
      this.showAlert = false;
      this.deleteUser();
    },
    rejectAlert() {
      this.isConfirmed = false;
      this.showAlert = false;
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5) {
  width: 25%;
}

td,
th {
  width: 15%;
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