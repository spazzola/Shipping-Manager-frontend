<template>
  <div class="content form-group">
    <form>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Imię:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="driver.name"
            :placeholder="name"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Nazwisko:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="driver.surname"
            :placeholder="surname"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
        <div class="col-2 col-content">
          <p
            v-for="(phoneNumber, index) in selectedDriver.phoneNumbers"
            :key="index"
          >
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedDriver.phoneNumbers[index].type"
              :placeholder="phoneNumbers[index].type"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedDriver.phoneNumbers[index].number"
              :placeholder="phoneNumbers[index].number"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="deletePhoneNumber(index)"
            >
              <i class="fas fa-times remove"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="row" v-for="index in phoneNumbersToAdd" :key="index.value">
        <div class="col-2 offset-6">
          <p>
            <input
              class="form-control form-control-sm"
              placeholder="Typ"
              v-model="driver.phoneNumbers[index].type"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer"
              v-model="driver.phoneNumbers[index].number"
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
          <p v-for="(plate, index) in selectedDriver.plates" :key="index">
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedDriver.plates[index].plateNumber"
              :placeholder="plates[index].plateNumber"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="deletePlate(index)"
            >
              <i class="fas fa-times remove"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="row" v-for="index in platesToAdd" :key="index.value">
        <div class="col-2 offset-6">
          <p>
            <input
              class="form-control form-control-sm"
              placeholder="Numer rejestracyjny"
              v-model.trim="driver.plates[index].plateNumber"
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

      <router-link :to="previousPath"
        ><button
          class="btn btn-sm btn-outline-success"
          @click.stop.prevent="submitForm"
        >
          Zapisz
        </button>
      </router-link>
      <router-link :to="previousPath"
        ><button
          class="btn btn-sm btn-outline-danger"
          @click.stop.prevent="goToPreviousPage"
          style="margin-left: 1rem;"
        >
          Cofnij
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "surname", "plates", "phoneNumbers"],
  data() {
    return {
      phoneNumbersToAdd: 0,
      platesToAdd: 0,
      selectedDriver: null,
      phoneNumbersToDelete: [],
      platesToDelete: [],
      driver: {
        id: null,
        name: null,
        surname: null,
        phoneNumbers: [
          {
            type: null,
            number: null,
          },
        ],
        plates: [
          {
            plateNumber: null,
          },
        ],
      },
    };
  },
  methods: {
    async goToPreviousPage() {
      this.$emit("clicked");
      this.$router.replace("/driver/" + this.id);
    },
    addNewPhoneNumber() {
      this.driver.phoneNumbers.push({ type: null, number: null });
      this.phoneNumbersToAdd += 1;
    },
    addNewPlate() {
      this.driver.plates.push({ plateNumber: null });
      this.platesToAdd += 1;
    },
    async submitForm() {
      this.driver.id = this.selectedDriver.id;

      if (this.driver.name === null) {
        this.driver.name = this.selectedDriver.name;
      }

      if (this.driver.surname === null) {
        this.driver.surname = this.selectedDriver.surname;
      }

      this.selectedDriver.phoneNumbers.forEach((phone) => {
        this.driver.phoneNumbers.push(phone);
      });

      this.selectedDriver.plates.forEach((plate) => {
        this.driver.plates.push(plate);
      });

      this.driver.phoneNumbers = this.driver.phoneNumbers.filter(function (
        phone
      ) {
        return phone.type != null;
      });
      this.driver.plates = this.driver.plates.filter(function (plate) {
        return plate.plateNumber != null;
      });

      if (this.phoneNumbersToDelete.length > 0) {
        await this.$store.dispatch("phones/deletePhoneNumbers", this.phoneNumbersToDelete);
      }
      if (this.platesToDelete.length > 0) {
        await this.$store.dispatch("plates/deletePlates", this.platesToDelete);
      }
      await this.$store.dispatch("drivers/setDriver", this.driver);
      await this.$store.dispatch("drivers/updateDriver", this.driver);
      await this.$store.dispatch("drivers/loadDriver", this.driver.id);
      this.goToPreviousPage();
    },
    deletePhoneNumber(index) {
      this.phoneNumbersToDelete.push(this.selectedDriver.phoneNumbers[index]);
      if (index > -1) {
        this.selectedDriver.phoneNumbers.splice(index, 1);
      }
    },
    deletePlate(index) {
      this.platesToDelete.push(this.selectedDriver.plates[index]);
      if (index > -1) {
        this.selectedDriver.plates.splice(index, 1);
      }
    },
    removePhoneField() {
      this.phoneNumbersToAdd -= 1;
    },
    removePlateField() {
      this.platesToAdd -= 1;
    },
  },
  computed: {
    previousPath() {
      return "/driver/" + this.id;
    }
  },
  created() {
    if (this.$store.getters["drivers/getDriver"] === null) {
      this.selectedDriver = this.$store.getters["drivers/getAllDrivers"].find(
        (driver) => driver.id === parseInt(this.id)
      );
    } else {
      this.selectedDriver = this.$store.getters["drivers/getDriver"];
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