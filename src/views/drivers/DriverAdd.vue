<template>
  <nav-menu></nav-menu>
  <company-menu></company-menu>
  <div class="content form-group">
    <form>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Imię:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="driver.name"
            placeholder="Imię"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Nazwisko:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="driver.surname"
            placeholder="Nazwisko"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
        <div class="col-2 col-content">
          <p v-for="index in phoneNumbersToAdd" :key="index">
            <input
              class="form-control form-control-sm"
              placeholder="Rodzaj"
              v-model.trim="driver.phoneNumbers[index - 1].type"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer telefonu"
              v-model.trim="driver.phoneNumbers[index - 1].number"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="removePhoneField"
            >
              <i class="fas fa-times remove"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="row button-row">
        <div class="col-2 offset-6 rotated">
          <button
            class="btn btn-sm btn-remove"
            style="width: 70%"
            @click.stop.prevent="addNewPhoneNumber"
          >
            <i class="fas fa-times"></i> Dodaj numer kontaktowy
          </button>
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Tablice rejestracyjne:</div>
        <div class="col-2 col-content">
          <p v-for="index in platesToAdd" :key="index">
            <input
              class="form-control form-control-sm"
              placeholder="Numer tablicy rejestracyjnej"
              v-model.trim="driver.plates[index - 1].plateNumber"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="removePlateField"
            >
              <i class="fas fa-times remove"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="row button-row">
        <div class="col-2 offset-6 rotated">
          <button
            class="btn btn-sm btn-remove"
            style="width: 70%"
            @click.stop.prevent="addNewPlate"
          >
            <i class="fas fa-times"></i> Dodaj tablice rejestracyjną
          </button>
        </div>
      </div>

      <button
        class="btn btn-sm btn-outline-success"
        @click.stop.prevent="submitForm"
      >
        Zapisz
      </button>
    </form>
  </div>
</template>

<script>
import CompanyMenu from "../merhants/CompanyMenu.vue";
import NavMenu from "../nav/NavMenu.vue";

export default {
  components: {
    NavMenu,
    CompanyMenu,
  },
  data() {
    return {
      phoneNumbersToAdd: 1,
      platesToAdd: 1,
      driver: {
        name: null,
        surname: null,
        plates: [
          {
            plateNumber: "",
          },
        ],
        phoneNumbers: [
          {
            type: "",
            number: null,
          },
        ],
      },
    };
  },
  methods: {
    addNewPhoneNumber() {
      this.driver.phoneNumbers.push({ type: "", number: null });
      this.phoneNumbersToAdd += 1;
    },
    addNewPlate() {
      this.driver.plates.push({
        plateNumber: "",
      });
      this.platesToAdd += 1;
    },
    async submitForm() {
      await this.$store.dispatch("drivers/addDriver", this.driver);
      this.$router.replace("/drivers");
    },
    removePhoneField() {
      if (this.phoneNumbersToAdd > 1) {
        this.phoneNumbersToAdd -= 1;
      }
    },
    removePlateField() {
      if (this.platesToAdd > 1) {
        this.platesToAdd -= 1;
      }
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

i {
  color: green;
  margin-right: 5%;
  transform: rotate(45deg);
}

.btn-remove {
  color: green !important;
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
  margin-top: -0.5rem !important;
  margin-bottom: 2rem;
}
</style>