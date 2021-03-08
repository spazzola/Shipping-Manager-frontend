<template>
  <nav-menu></nav-menu>
  <company-menu></company-menu>
  <div class="content" v-if="!editMode">
    <h2>{{ companyName }}</h2>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">NIP:</div>
      <div class="col-2 col-content">{{ nip }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">REGON:</div>
      <div class="col-2 col-content">{{ regon }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Email:</div>
      <div class="col-2 col-content">{{ email }}</div>
    </div>
    <div class="row row-top-margin" row-top-margin>
      <div class="col-2 offset-4 col-title">Adres:</div>
      <div class="col-2 col-content">
        ul.{{ streetAndHouseNumber }} <br />
        {{ postalCodeAndCity }}
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
      <div class="col-2 col-content">
        <p v-for="phoneNumber in phoneNumbers" :key="phoneNumber.phone">
          {{ phoneNumber.type }}: {{ phoneNumber.number }}
        </p>
      </div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Konta bankowe:</div>
      <div class="col-2 col-content">
        <p v-for="bankAccount in bankAccounts" :key="bankAccount.accountNumber">
          {{ bankAccount.accountName }}: {{ bankAccount.accountNumber }}
        </p>
      </div>
    </div>
  </div>

  <router-view v-else>
    <company-edit
      :id="id"
      :companyName="companyName"
      :nip="nip"
      :regon="regon"
      :email="email"
      :street="street"
      :houseNumber="houseNumber"
      :postalCode="postalCode"
      :city="city"
      :phoneNumbers="phoneNumbers"
      :bankAccounts="bankAccounts"
      @clicked="switchMode"
    >
    </company-edit>
  </router-view>

  <div class="row row-top-margin">
    <div class="col-2 offset-5">
      <router-link :to="editCompany" v-if="!editMode"
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
import CompanyMenu from "./CompanyMenu.vue";
import CompanyEdit from "./CompanyEdit.vue";

export default {
  components: {
    NavMenu,
    CompanyMenu,
    CompanyEdit,
  },
  props: ["id"],
  data() {
    return {
      selectedCompany: null,
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
    currentCompany() {
      if (this.$store.getters["companies/getCompany"] === null) {
        return this.selectedCompany;
      } else {
        this.$store.dispatch('companies/unloadCompany');
        return this.$store.getters["companies/getCompany"];
      }
    },
    previousPath() {
      return "/company/" + this.id;
    },
    editCompany() {
      return this.$route.path + "/edit";
    },
    companyName() {
      return this.currentCompany.companyName;
    },
    nip() {
      return this.currentCompany.nip;
    },
    regon() {
      return this.currentCompany.regon;
    },
    email() {
      return this.currentCompany.email;
    },
    streetAndHouseNumber() {
      return (
        this.currentCompany.address.street +
        " " +
        this.currentCompany.address.houseNumber
      );
    },
    postalCodeAndCity() {
      return (
        this.currentCompany.address.postalCode +
        " " +
        this.currentCompany.address.city
      );
    },
    phoneNumbers() {
      return this.currentCompany.phoneNumbers;
    },
    bankAccounts() {
      return this.currentCompany.bankAccounts;
    },
    street() {
      return this.currentCompany.address.street;
    },
    houseNumber() {
      return this.currentCompany.address.houseNumber;
    },
    city() {
      return this.currentCompany.address.city;
    },
    postalCode() {
      return this.currentCompany.address.postalCode;
    },
  },
  created() {
    this.selectedCompany = this.$store.getters[
      "companies/getAllCompanies"
    ].find((company) => company.id === parseInt(this.id));
  }
};
</script>

<style>
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
