<template>
  <div class="content form-group">
    <form>
      <h2>
        <div class="row row-top-margin">
          <div class="col-3 offset-5 col-title">
            <input
              class="form-control header"
              v-model="company.companyName"
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
            v-model="company.nip"
            :placeholder="nip"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">REGON:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="company.regon"
            :placeholder="regon"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Email:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="company.email"
            :placeholder="email"
          />
        </div>
      </div>
      <div class="row row-top-margin" row-top-margin>
        <div class="col-2 offset-4 col-title">Adres:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="company.address.street"
            :placeholder="'ul. ' + street"
          />
          <input
            class="form-control form-control-sm"
            v-model="company.address.houseNumber"
            :placeholder="houseNumber"
          />
          <input
            class="form-control form-control-sm"
            v-model="company.address.postalCode"
            :placeholder="postalCode"
          />
          <input class="form-control form-control-sm" :placeholder="city" />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
        <div class="col-2 col-content">
          <p
            v-for="(phoneNumber, index) in selectedCompany.phoneNumbers"
            :key="index"
          >
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedCompany.phoneNumbers[index].type"
              :placeholder="phoneNumbers[index].type"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedCompany.phoneNumbers[index].number"
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
              placeholder="typ"
              v-model="company.phoneNumbers[index].type"
            />
            <input
              class="form-control form-control-sm"
              placeholder="numer"
              v-model="company.phoneNumbers[index].number"
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
          <p
            v-for="(bankAccount, index) in selectedCompany.bankAccounts"
            :key="index"
          >
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedCompany.bankAccounts[index].accountName"
              :placeholder="bankAccounts[index].accountName"
            />
            <input
              class="form-control form-control-sm"
              v-model.trim="selectedCompany.bankAccounts[index].accountNumber"
              :placeholder="bankAccounts[index].accountNumber"
            />
            <button
              class="btn btn-sm btn-remove remove"
              @click.stop.prevent="deleteBankAccount(index)"
            >
              <i class="fas fa-times remove"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="row" v-for="index in bankAccountsToAdd" :key="index">
        <div class="col-2 offset-6">
          <p>
            <input
              class="form-control form-control-sm"
              placeholder="Typ"
              v-model.trim="company.bankAccounts[index].accountName"
              :key="index"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer"
              v-model.trim="company.bankAccounts[index].accountNumber"
              :key="index"
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
      phoneNumbersToDelete: [],
      bankAccountsToDelete: [],
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
            acountName: null,
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
      this.company.bankAccounts.push({
        accountNumber: null,
        accountName: null
      });
      this.bankAccountsToAdd += 1;
    },
    async submitForm() {
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

      this.selectedCompany.phoneNumbers.forEach((phone) => {
        this.company.phoneNumbers.push(phone)
      });

      this.company.phoneNumbers = this.company.phoneNumbers.filter(function (phone) {
        return phone.type != null;
      });

      this.selectedCompany.bankAccounts.forEach((bankAccount) => {
        this.company.bankAccounts.push(bankAccount)
      });    

      this.company.bankAccounts = this.company.bankAccounts.filter(function (bankAccount) {
        return bankAccount.accountNumber != null;
      });

      if (this.phoneNumbersToDelete.length > 0) {
        await this.$store.dispatch("phones/deletePhoneNumbers", this.phoneNumbersToDelete);
      }

      if (this.bankAccountsToDelete.length > 0) {
        await this.$store.dispatch("bankAccounts/deleteBankAccounts", this.bankAccountsToDelete);
      }

      await this.$store.dispatch("companies/setCompany", this.company);
      await this.$store.dispatch("companies/updateCompany", this.company);
      await this.$store.dispatch("companies/loadCompany", this.company.id);
      this.goToPreviousPage();
    },
    deletePhoneNumber(index) {
      this.phoneNumbersToDelete.push(this.selectedCompany.phoneNumbers[index]);
      if (index > -1) {
        this.selectedCompany.phoneNumbers.splice(index, 1);
      }
    },
    deleteBankAccount(index) {
      this.bankAccountsToDelete.push(this.selectedCompany.bankAccounts[index]);
      if (index > -1) {
        this.selectedCompany.bankAccounts.splice(index, 1);
      }
    },
    removePhoneField() {
      this.phoneNumbersToAdd -= 1;
    },
    removeBankAccountField() {
      this.bankAccountsToAdd -= 1;
    }
  },
  computed: {
    previousPath() {
      return "/company/" + this.id;
    },
  },
  created() {
    if (this.$store.getters["companies/getCompany"] === null) {
      this.selectedCompany = this.$store.getters[
        "companies/getAllCompanies"
      ].find((company) => company.id === parseInt(this.id));
    } else {
      this.selectedCompany = this.$store.getters["companies/getCompany"];
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

.row {
  margin-top: 1rem;
}

.remove {
  color: red !important;
  display: inline;
}

.button-row {
  margin-top: -0.5rem !important;
  margin-bottom: 2rem;
}
</style>