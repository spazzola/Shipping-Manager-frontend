<template>
  <nav-menu></nav-menu>
  <driver-menu></driver-menu>
  <div class="content" v-if="!editMode">
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Imię:</div>
      <div class="col-2 col-content">{{ name }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Nazwisko:</div>
      <div class="col-2 col-content">{{ surname }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Numery rejestracyjne:</div>
      <div class="col-2 col-content">
        <p v-for="plate in plates" :key="plate.plateNumber">
          {{ plate.plateNumber }}
        </p>
      </div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
      <div class="col-2 col-content">
        <p v-for="phoneNumber in phoneNumbers" :key="phoneNumber.number">
          {{ phoneNumber.type }}: {{ phoneNumber.number }}
        </p>
      </div>
    </div>
  </div>

  <router-view v-else>
    <driver-edit
      :id="id"
      :name="name"
      :surname="surname"
      :plates="plates"
      :phoneNumbers="phoneNumbers"
      @clicked="switchMode"
    >
    </driver-edit>
  </router-view>

  <div class="row row-top-margin">
    <div class="col-2 offset-5">
      <router-link :to="editDriver" v-if="!editMode"
        ><button class="btn btn-sm btn-outline-success" @click="switchMode">
          Edytuj
        </button></router-link
      >
      <div v-else></div>
    </div>
  </div>
  <div class="row row-top-margin">
    <div class="col-2 offset-5"></div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import DriverMenu from './DriverMenu.vue';
import DriverEdit from './DriverEdit.vue';

export default {
  components: {
    NavMenu,
    DriverMenu,
    DriverEdit,
  },
  props: ["id"],
  data() {
    return {
      selectedDriver: null,
      editMode: false,
    };
  },
  methods: {
    isEditMode() {
      return this.editMode;
    },
    switchMode() {
      this.editMode = !this.editMode;
    },
  },
  computed: {
    currentDriver() {
      if (this.$store.getters["drivers/getDriver"] === null) {
        return this.selectedDriver;
      } else {
        //this.$store.dispatch('drivers/unloadDriver');
        return this.$store.getters["drivers/getDriver"];
      }
    },
    previousPath() {
      return "/driver/" + this.id;
    },
    editDriver() {
      return this.$route.path + "/edit";
    },
    name() {
      return this.currentDriver.name;
    },
    surname() {
      return this.currentDriver.surname;
    },
    phoneNumbers() {
      return this.currentDriver.phoneNumbers;
    },
    plates() {
      return this.currentDriver.plates;
    }
  },
  created() {
    this.selectedDriver = this.$store.getters[
      "drivers/getAllDrivers"
    ].find((driver) => driver.id === parseInt(this.id));
  }
};
</script>

<style scoped>
.content {
  width: 100%;
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

.col-title {
  text-align: right;
  font-weight: bold;
}

.col-content {
  text-align: left !important;
}

.row-top-margin {
  margin-top: 1%;
}

p {
  text-align: left;
  margin-bottom: 0;
}

.btn {
  margin-left: 5%;
}
</style>
