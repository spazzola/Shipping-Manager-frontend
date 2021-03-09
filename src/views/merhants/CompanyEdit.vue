<template>
  <div class="content form-group">
    <form>
      <h2>
        <div class="row row-top-margin">
          <div class="col-3 offset-5 col-title">
            <input
              class="form-control header"
              v-model.trim="company.companyName"
              :placeholder="companyName"
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
            :placeholder="nip"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">REGON:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.regon"
            :placeholder="regon"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Email:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.email"
            :placeholder="email"
          />
        </div>
      </div>
      <div class="row row-top-margin" row-top-margin>
        <div class="col-2 offset-4 col-title">Adres:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.street"
            :placeholder="'ul. ' + street"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.houseNumber"
            :placeholder="houseNumber"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.postalCode"
            :placeholder="postalCode"
          />
          <input class="form-control form-control-sm" :placeholder="city" />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
        <div class="col-2 col-content">
          <p v-for="phoneNumber in phoneNumbers" :key="phoneNumber.phone">
            <input
              class="form-control form-control-sm"
              :placeholder="phoneNumber.type"
            />
            <input
              class="form-control form-control-sm"
              :placeholder="phoneNumber.number"
            />
          </p>
        </div>
      </div>

      <div class="row" v-for="index in phoneNumbersToAdd" :key="index.value">
        <div class="col-2 offset-6">
          <p>
            <input
              class="form-control form-control-sm"
              placeholder="typ"
              v-model.trim="company.phoneNumbers[index].type"
            />
            <input
              class="form-control form-control-sm"
              placeholder="numer"
              v-model.trim="company.phoneNumbers[index].number"
            />
          </p>
        </div>
      </div>

      <div class="row">
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
          <p
            v-for="bankAccount in bankAccounts"
            :key="bankAccount.accountNumber"
          >
            <input
              class="form-control form-control-sm"
              :placeholder="bankAccount.accountName"
            />
            <input
              class="form-control form-control-sm"
              :placeholder="bankAccount.accountNumber"
            />
          </p>
        </div>
      </div>

      <div class="row" v-for="index in bankAccountsToAdd" :key="index.value">
        <div class="col-2 offset-6">
          <p>
            <input
              class="form-control form-control-sm"
              placeholder="typ"
              v-model.trim="company.bankAccounts[index].accountType"
            />
            <input
              class="form-control form-control-sm"
              placeholder="numer"
              v-model.trim="company.bankAccounts[index].accountNumber"
            />
          </p>
        </div>
      </div>

      <div class="row" style="margin-bottom: 1%;">
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
        >
          Cofnij
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
//import axios from "../../axios-auth";

export default {
  props: [
    "id",
    "companyName",
    "nip",
    "regon",
    "email",
    "street",
    "houseNumber",
    "postalCode",
    "city",
    "phoneNumbers",
    "bankAccounts",
  ],
  data() {
    return {
      phoneNumbersToAdd: 0,
      bankAccountsToAdd: 0,
      selectedCompany: null,
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
            type: null,
            number: null,
          },
        ],
        bankAccounts: [
          {
            accountNumber: null,
            acountType: null,
          },
        ],
      },
    };
  },
  methods: {
    async goToPreviousPage() {
      this.$emit("clicked");
      this.$router.push("/company/" + this.id);
    },
    addNewPhoneNumber() {
      this.company.phoneNumbers.push({ type: null, number: null });
      this.phoneNumbersToAdd += 1;
    },
    addNewBankAccount() {
      this.company.bankAccounts.push({ accountNumber: null, accountType: null });
      this.bankAccountsToAdd += 1;
    },
    async submitForm() {
      console.log(this.company.phoneNumbers);
      this.company.id = this.selectedCompany.id;
      if (this.company.companyName === null) {
        this.company.companyName = this.selectedCompany.companyName;
      }
      if (this.company.nip === null) {
        this.company.nip = this.selectedCompany.nip;
      }
      if (this.company.regon === null) {
        this.company.regon = this.selectedCompany.regon;
      }
      if (this.company.email === null) {
        this.company.email = this.selectedCompany.email;
      }
      if (this.company.address.street === null) {
        this.company.address.street = this.selectedCompany.address.street;
      }
      if (this.company.address.houseNumber === null) {
        this.company.address.houseNumber = this.selectedCompany.address.houseNumber;
      }
      if (this.company.address.postalCode === null) {
        this.company.address.postalCode = this.selectedCompany.address.postalCode;
      }
      if (this.company.address.city === null) {
        this.company.address.city = this.selectedCompany.address.city;
      }
      if (this.company.phoneNumbers.length === 0) {
        console.log("nie zmieniono numerow telefonow")
        this.company.phoneNumbers = this.selectedCompany.phoneNumbers;
      } else {
        this.selectedCompany.phoneNumbers.forEach((i) => {
          this.company.phoneNumbers.push(i);
        });
        this.removeEmptyPhoneNumber();
      }
      if (this.company.bankAccounts.length === 0) {
        this.company.bankAccounts = this.selectedCompany.bankAccounts;
      } else {
        this.selectedCompany.bankAccounts.forEach((i) => {
          this.company.bankAccounts.push(i);
        });
        this.removeEmptyBankAccount();
      }
      console.log(this.company);
      await this.$store.dispatch('companies/updateCompany', this.company);
      await this.$store.dispatch("companies/loadCompany", this.company.id);
      this.goToPreviousPage();
    },
    removeEmptyPhoneNumber() {
      this.company.phoneNumbers.splice(0, 1);
    },
    removeEmptyBankAccount() {
      this.company.bankAccounts.splice(0, 1);
    }
  },
  computed: {
    previousPath() {
      return "/company/" + this.id;
    },
  },
  created() {
    this.selectedCompany = this.$store.getters[
      "companies/getAllCompanies"
    ].find((company) => company.id === parseInt(this.id));
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
</style>