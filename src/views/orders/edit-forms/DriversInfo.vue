<template>
  <form>
    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o kierowcach</h4>
      </div>
    </div>
    <div
      class="row row-top-margin"
      v-for="(driver, driverIndex) in selectedOrder.orderDrivers"
      :key="driverIndex"
    >
      <div class="col-2 offset-4 col-title">Imię:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="drivers[driverIndex].name"
          :placeholder="driver.name"
        />
      </div>
      <div class="col-2 offset-4 col-title additional-top-margin">
        Nazwisko:
      </div>
      <div class="col-2 col-content additional-top-margin">
        <input
          class="form-control form-control-sm"
          v-model.trim="drivers[driverIndex].surname"
          :placeholder="driver.surname"
        />
      </div>
      <div class="col-2 offset-4 col-title additional-top-margin">
        Telefony kontaktowe:
      </div>
      <div class="col-2 col-content additional-top-margin">
        <div  v-if="drivers[driverIndex].firstPhoneNumber !== null">
          <input
            class="form-control form-control-sm"
            v-model="drivers[driverIndex].firstPhoneNumber"
            :placeholder="driver.firstPhoneNumber"
          />
        </div>
          <div v-if="drivers[driverIndex].secondPhoneNumber !== null">
            <input
            class="form-control form-control-sm"
            v-model="drivers[driverIndex].secondPhoneNumber"
            :placeholder="driver.secondPhoneNumber"
          />
          </div>
        
      </div>
      <div
        class="col-2 offset-4 col-title additional-top-margin"
      >
        Tablice rejestracyjne:
      </div>
      <div class="col-2 col-content additional-top-margin">
        <div v-if="drivers[driverIndex].firstPlate !== null">
          <input
            class="form-control form-control-sm"
            v-model="drivers[driverIndex].firstPlate"
            :placeholder="driver.firstPlate"
          />
        </div>
        <div v-if="drivers[driverIndex].secondPlate !== null">
          <input
            class="form-control form-control-sm"
            v-model="drivers[driverIndex].secondPlate"
            :placeholder="driver.secondPlate"
          />
        </div>

      </div>
    </div>
    <div class="button-row">
      <button
        class="btn btn-sm btn-outline-danger additional-top-margin"
        @click.stop.prevent="goBack"
      >
        Cofnij
      </button>
      <button
        class="btn btn-sm btn-outline-success additional-top-margin"
        style="margin-left: 1rem"
        @click.stop.prevent="submitForm"
      >
        Aktualizuj zlecenie
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["selectedOrder"],
  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    goBack() {
      this.$emit("go-back");
    },
    submitForm() {
      this.$emit("drivers-info", this.drivers);
    },
  },
  created() {
    this.drivers = this.selectedOrder.orderDrivers;
    console.log(this.selectedOrder);
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

i {
  color: green;
  margin-right: 5%;
  transform: rotate(45deg);
}

.btn-remove {
  color: green !important;
}

.remove {
  color: red !important;
  display: inline;
}

.row {
  margin-top: 1rem;
}

.button-row {
  margin-top: 1.5rem !important;
}

.additional-top-margin {
  margin-top: 1rem;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}
</style>