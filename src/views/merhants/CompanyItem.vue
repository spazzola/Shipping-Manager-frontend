<template>
  <base-alert v-if="showAlert" title="Potwierdź czynność">
    <template #default>
      <p>Czy napewno chcesz usunąć firmę?</p>
    </template>
    <template #actions>
      <base-button
        @click="confirmAlert"
        :buttonType="'confirm'"
        :buttonText="'Tak'"
      ></base-button>
      <base-button
        @click="rejectAlert"
        :buttonType="'reject'"
        :buttonText="'Nie'"
      ></base-button>
    </template>
  </base-alert>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <td scope="row">
            <button class="btn btn-sm btn-remove" @click="deleteCompany">
              <i class="fas fa-times"></i>
            </button>

            <router-link :to="companyDetailsLink"
              ><button
                class="btn btn-sm btn-outline-success"
                style="float: right"
                @click="changeMode"
              >
                Szczegóły
              </button>
            </router-link>
          </td>
          <td scope="row">{{ companyName }}</td>
          <td scope="row">{{ nip }}</td>
          <td scope="row">{{ regon }}</td>
          <td scope="row">{{ email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id", "companyName", "nip", "regon", "email"],
  data() {
    return {
      showAlert: false,
      isConfirmed: false,
    };
  },
  computed: {
    companyDetailsLink() {
      return "/company/" + this.id;
    },
  },
  methods: {
    async deleteCompany() {
      this.showAlert = true;
      if (this.isConfirmed) {
        await this.$store.dispatch("companies/deleteCompany", this.id);
        await this.$store.dispatch("companies/loadCompanies");
        this.$router.replace("/companies");
      }
    },
    confirmAlert() {
      this.isConfirmed = true;
      this.showAlert = false;
      this.deleteCompany();
    },
    rejectAlert() {
      this.isConfirmed = false;
      this.showAlert = false;
    }
  },
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
table th:nth-child(5),
table th:nth-child(6) {
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