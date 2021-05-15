<template>
 <base-alert v-if="showAlert" title="Potwierdź czynność">
    <template #default>
      <p>Czy napewno chcesz usunąć kierowcę?</p>
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
            <button class="btn btn-sm btn-remove" @click="deleteDriver">
              <i class="fas fa-times"></i>
            </button>

            <router-link :to="driverEditLink"
              ><button
                class="btn btn-sm btn-outline-success"
                style="float: right"
              >
                Szczegóły
              </button>
            </router-link>
          </td>
          <td scope="row">{{ fullName }}</td>
          <td scope="row">
            <p v-for="plate in plates" :key="plate.id">
              {{ plate.plateNumber }}
            </p>
          </td>
          <td scope="row">
            <p v-for="phoneNumber in phoneNumbers" :key="phoneNumber.id">
              {{ phoneNumber.type }}: {{ phoneNumber.number }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "surname", "plates", "phoneNumbers"],
  data() {
    return {
      showAlert: false,
      isConfirmed: false
    }
  },
  computed: {
    fullName() {
      return this.name + " " + this.surname;
    },
    driverEditLink() {
      return "/driver/" + this.id;
    },
  },
  methods: {
    async deleteDriver() {
      this.showAlert = true;
      if (this.isConfirmed) {
        await this.$store.dispatch("drivers/deleteDriver", this.id);
        await this.$store.dispatch("drivers/loadDrivers");
        this.$router.replace("/drivers");
      }
    },
    confirmAlert() {
      this.isConfirmed = true;
      this.showAlert = false;
      this.deleteDriver();
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

p {
  margin-left: 1rem;
  display: inline-block;
}
</style>