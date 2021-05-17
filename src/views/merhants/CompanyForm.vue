<template>
  <base-alert v-if="showAlert" title="Błąd">
    <template #default>
      <p>Sprawdź czy wszystkie pola zostały uzupełnione</p>
    </template>
    <template #actions>
      <base-button
        @click="confirmAlert"
        :buttonType="'confirm'"
        :buttonText="'Ok'"
      ></base-button>
    </template>
  </base-alert>
  <div class="content form-group">
    <form>
      <h2>
        <div class="row row-top-margin">
          <div class="col-3 offset-5 col-title">
            <input
              class="form-control header"
              v-model.trim="company.companyName"
              placeholder="Nazwa firmy"
              :disabled="disableInputs"
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
            :disabled="disableInputs"
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
            :disabled="disableInputs"
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
            :disabled="disableInputs"
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
            :disabled="disableInputs"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.houseNumber"
            placeholder="Numer budynku"
            :disabled="disableInputs"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.postalCode"
            placeholder="Kod pocztowy"
            :disabled="disableInputs"
          />
          <input
            class="form-control form-control-sm"
            v-model.trim="company.address.city"
            placeholder="Miasto"
            :disabled="disableInputs"
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
              :disabled="disableInputs"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer telefonu"
              v-model.trim="company.phoneNumbers[index - 1].number"
              :key="index"
              :disabled="disableInputs"
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
          <p v-for="index in bankAccountsToAdd" :key="index.value">
            <input
              class="form-control form-control-sm"
              placeholder="Nazwa"
              v-model.trim="company.bankAccounts[index - 1].accountName"
              :disabled="disableInputs"
            />
            <input
              class="form-control form-control-sm"
              placeholder="Numer konta"
              v-model.trim="company.bankAccounts[index - 1].accountNumber"
              :disabled="disableInputs"
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
  props: ["buttonText", "showBackButton", "disableInputs"],
  emits: ["go-back", "company-data"],
  data() {
    return {
      showAlert: false,
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
      if (this.validateForm() || this.disableInputs) {
        this.$emit("company-data", this.company);
      } else {
        this.showAlert = true;
      }
    },
    validateForm() {
      if (this.company.companyName === null || this.company.companyName === '') {
        return false;
      }
      if (this.company.nip === null || this.company.nip === '') {
        return false;
      }
      if (this.company.regon === null || this.company.regon === '') {
        return false;
      }
      if (this.company.email === null || this.company.email === '') {
        return false;
      }
      if (this.company.address.street === null || this.company.address.street === '') {
        return false;
      }
      if (this.company.address.houseNumber === null || this.company.address.houseNumber === '') {
        return false;
      }
      if (this.company.address.postalCode === null || this.company.address.postalCode === '') {
        return false;
      }
      if (this.company.address.city === null || this.company.address.city === '') {
        return false;
      }
      if (!this.validatePhoneNumbers()) {
        return false;
      }
      if (!this.validateBankAccounts()) {
        return false;
      }
      return true;
    },
    validatePhoneNumbers() {
      let phoneNumbers = this.company.phoneNumbers;
      for (let i = 0; i < phoneNumbers.length; i++) {
        let phoneNumber = phoneNumbers[i];
        if (phoneNumber.type === null || phoneNumber.type === '') {
          return false;
        }
        if (phoneNumber.number === null || phoneNumber.number === '') {
          return false;
        }
        return true;
      }
    },
    validateBankAccounts() {
      let bankAccounts = this.company.bankAccounts;
      for (let i = 0; i < bankAccounts.length; i++) {
        let bankAccount = bankAccounts[i];
        if (bankAccount.accountName === null || bankAccount.accountName === '') {
          return false;
        }
        if (bankAccount.accountNumber === null || bankAccount.accountNumber === '') {
          return false;
        }
        return true;
      }
    },
    removePhoneField() {
      if (this.phoneNumbersToAdd > 1) {
        this.phoneNumbersToAdd -= 1;
      }
    },
    removeBankAccountField() {
      if (this.bankAccountsToAdd > 1) {
        this.bankAccountsToAdd -= 1;
      }
    },
    confirmAlert() {
      this.showAlert = false;
    },
    goBack() {
      this.$emit("go-back");
    },
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