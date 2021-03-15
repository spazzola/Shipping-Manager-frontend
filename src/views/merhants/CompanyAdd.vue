<template>
  <nav-menu></nav-menu>
  <company-menu></company-menu>
  <div class="content form-group">
    <form>
      <h2>
        <div class="row row-top-margin">
          <div class="col-3 offset-5 col-title">
            <input
              class="form-control header"
              v-model.trim="company.companyName"
              placeholder="Nazwa firmy"
            />
          </div>
        </div>
      </h2>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">NIP:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.nip"
            placeholder="NIP"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">REGON:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.regon"
            placeholder="REGON"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Email:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.email"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="row row-top-margin" row-top-margin>
        <div class="col-2 offset-4 col-title">Adres:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.street"
            placeholder="Nazwa ulicy"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.houseNumber"
            placeholder="Numer budynku"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.postalCode"
            placeholder="Kod pocztowy"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.city"
            placeholder="Miasto"
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
              v-model.trim="company.phoneNumbers[index - 1].type"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer telefonu"
              v-model.trim="company.phoneNumbers[index - 1].number"
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
        <div class="col-2 offset-4 col-title">Konta bankowe:</div>
        <div class="col-2 col-content">
          <p  v-for="index in bankAccountsToAdd" :key="index.value">
            <input
              class="form-control form-control-sm"
              placeholder="Nazwa"
              v-model.trim="company.bankAccounts[index - 1].accountName"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer konta"
              v-model.trim="company.bankAccounts[index - 1].accountNumber"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="removeBankAccountField"
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
            @click.stop.prevent="addNewBankAccount"
          >
            <i class="fas fa-times"></i> Dodaj konto bankowe
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
import NavMenu from "../nav/NavMenu.vue";
import CompanyMenu from "./CompanyMenu.vue";
//import axios from "../../axios-auth.js";

export default {
  components: {
    NavMenu,
    CompanyMenu,
  },
  data() {
    return {
      phoneNumbersToAdd: 1,
      bankAccountsToAdd: 1,
      company: {
        id: null,
        companyName: null,
        nip: null,
        regon: null,
        email: null,
        address: {
          street: null,
          houseNumber: null,
          postalCode: null,
          city: null,
        },
        phoneNumbers: [
          {
            type: "",
            number: null,
          },
        ],
        bankAccounts: [
          {
            accountName: "",
            accountNumber: null,
          },
        ],
      },
    };
  },
  methods: {
    addNewPhoneNumber() {
      this.company.phoneNumbers.push({ type: "", number: null });
      this.phoneNumbersToAdd += 1;
    },
    addNewBankAccount() {
      this.company.bankAccounts.push({
        accountNumber: null,
        accountName: "",
      });
      this.bankAccountsToAdd += 1;
    },
    submitForm() {
      this.$store.dispatch("companies/addCompany", this.company);
      this.$store.dispatch("companies/loadCompanies");
      this.$router.replace("/companies");
    },
    removePhoneField() {
      if (this.phoneNumbersToAdd > 1) {
        this.phoneNumbersToAdd -= 1;
      }
    },
    removeBankAccountField() {
      if (this.bankAccountsToAdd  > 1) {
        this.bankAccountsToAdd -= 1;
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