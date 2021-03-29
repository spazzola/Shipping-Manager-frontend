<template>
  <div class="content form-group">
    <form>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Imię:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="drivers[0].name"
            placeholder="Imię"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Nazwisko:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="drivers[0].surname"
            placeholder="Nazwisko"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
        <div class="col-2 col-content">
          <p v-for="index in firstDriverphoneNumbersToAdd" :key="index">
            <input
              class="form-control form-control-sm"
              placeholder="Rodzaj"
              v-model.trim="drivers[0].phoneNumbers[index - 1].type"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer telefonu"
              v-model.trim="drivers[0].phoneNumbers[index - 1].number"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="removeFirstDriverPhoneField"
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
            @click.stop.prevent="addNewPhoneNumberForFirstDriver"
            v-if="firstDriverphoneNumbersToAdd < 2"
          >
            <i class="fas fa-times"></i> Dodaj numer kontaktowy
          </button>
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Tablice rejestracyjne:</div>
        <div class="col-2 col-content">
          <p v-for="index in firstDriverPlatesToAdd" :key="index">
            <input
              class="form-control form-control-sm"
              placeholder="Numer tablicy rejestracyjnej"
              v-model.trim="drivers[0].plates[index - 1].plateNumber"
              :key="index"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="removeFirstDriverPlateField"
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
            @click.stop.prevent="addNewPlateForFirstDriver"
            v-if="firstDriverPlatesToAdd < 2"
          >
            <i class="fas fa-times"></i> Dodaj tablice rejestracyjną
          </button>
        </div>
      </div>

      <div v-if="showNextDriverForm">
        <form>
          <div class="row row-top-margin">
            <div class="col-2 offset-4 col-title">Imię:</div>
            <div class="col-2 col-content">
              <input
                class="form-control form-control-sm"
                v-model.trim="drivers[1].name"
                placeholder="Imię"
              />
            </div>
          </div>
          <div class="row row-top-margin">
            <div class="col-2 offset-4 col-title">Nazwisko:</div>
            <div class="col-2 col-content">
              <input
                class="form-control form-control-sm"
                v-model.trim="drivers[1].surname"
                placeholder="Nazwisko"
              />
            </div>
          </div>
          <div class="row row-top-margin">
            <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
            <div class="col-2 col-content">
              <p v-for="index in secondDriverPhoneNumbersToAdd" :key="index">
                <input
                  class="form-control form-control-sm"
                  placeholder="Rodzaj"
                  v-model.trim="drivers[1].phoneNumbers[index - 1].type"
                  :key="index"
                />
                <input
                  class="form-control form-control-sm"
                  placeholder="Numer telefonu"
                  v-model.trim="drivers[1].phoneNumbers[index - 1].number"
                  :key="index"
                />
                <button
                  class="btn btn-sm btn-remove remove"
                  @click.stop.prevent="removeSecondDriverPhoneField"
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
                @click.stop.prevent="addNewPhoneNumberForSecondDriver"
                v-if="secondDriverPhoneNumbersToAdd < 2"
              >
                <i class="fas fa-times"></i> Dodaj numer kontaktowy
              </button>
            </div>
          </div>

          <div class="row row-top-margin">
            <div class="col-2 offset-4 col-title">Tablice rejestracyjne:</div>
            <div class="col-2 col-content">
              <p v-for="index in secondDriverPlatesToAdd" :key="index">
                <input
                  class="form-control form-control-sm"
                  placeholder="Numer tablicy rejestracyjnej"
                  v-model.trim="drivers[1].plates[index - 1].plateNumber"
                  :key="index"
                />
                <button
                  class="btn btn-sm btn-remove remove"
                  @click.stop.prevent="removeFirstDriverPlateField"
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
                @click.stop.prevent="addNewPlateForSecondDriver"
                v-if="secondDriverPlatesToAdd < 2"
              >
                <i class="fas fa-times"></i> Dodaj tablice rejestracyjną
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="row button-row">
        <div class="col-2 offset-6">
          <button
            :class="successOrRemoveClass"
            @click.stop.prevent="addNextDriver"
            v-if="showBackButton"
            style="margin-right: 1rem"
          >
            {{ addOrRemoveBtnText }}
          </button>
        </div>
      </div>

      <button
        class="btn btn-sm btn-outline-danger"
        @click.stop.prevent="goBack"
        v-if="showBackButton"
        style="margin-right: 1rem"
      >
        Cofnij
      </button>
      <button
        class="btn btn-sm btn-outline-success"
        @click.stop.prevent="submitForm"
      >
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["buttonText", "showBackButton"],
  data() {
    return {
      firstDriverphoneNumbersToAdd: 1,
      firstDriverPlatesToAdd: 1,
      secondDriverPhoneNumbersToAdd: 1,
      secondDriverPlatesToAdd: 1,
      showNextDriverForm: false,
      drivers: []
    };
  },
  computed: {
    addOrRemoveBtnText() {
      if (this.showNextDriverForm === false) {
        return "Dodaj kolejnego kierowcę";
      } else {
        return "Usuń kierowcę";
      }
    },
    successOrRemoveClass() {
      if (this.showNextDriverForm === false) {
        return "btn btn-sm btn-outline-success";
      } else {
        return "btn btn-sm btn-outline-danger";
      }
    },
  },
  methods: {
    addNewPhoneNumberForFirstDriver() {
      this.drivers[0].phoneNumbers.push({ type: "", number: null });
      this.firstDriverphoneNumbersToAdd += 1;
    },
    removeFirstDriverPhoneField() {
      if (this.firstDriverphoneNumbersToAdd > 1) {
        this.firstDriverphoneNumbersToAdd -= 1;
      }
    },
    addNewPlateForFirstDriver() {
      this.drivers[0].plates.push({
        plateNumber: ""
      });
      this.firstDriverPlatesToAdd += 1;
    },
    addNewPhoneNumberForSecondDriver() {
      this.drivers[1].phoneNumbers.push({ type: "", number: null });
      this.secondDriverPhoneNumbersToAdd += 1;
    },
    removeSecondDriverPhoneField() {
      if (this.secondDriverPhoneNumbersToAdd > 1) {
        this.secondDriverPhoneNumbersToAdd -= 1;
      }
    },
    addNewPlateForSecondDriver() {
      this.drivers[1].plates.push({
        plateNumber: ""
      });
      this.secondDriverPlatesToAdd += 1;
    },
    removeFirstDriverPlateField() {
      if (this.secondDriverPlatesToAdd > 1) {
        this.secondDriverPlatesToAdd -= 1;
      }
    },
    async submitForm() {
      this.$emit("driver-data", this.drivers);
    },
    addNextDriver() {
      if (this.showNextDriverForm === false) {
        this.drivers.push({
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
        });
        this.showNextDriverForm = true;
      } else {
        this.showNextDriverForm = false;
        this.drivers.pop();
      }
    },
    goBack() {
      this.$emit("go-back");
    },
  },
  created() {
    this.drivers.push({
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
    });
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