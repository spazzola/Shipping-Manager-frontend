<template>
  <nav-menu></nav-menu>
  <invoice-menu :isAddMode="true"></invoice-menu>
  <div class="content form-group">
    <form>
      <div class="row">
        <div class="col-2 offset-4 col-title">Nadano w:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="invoice.issuedIn"
            placeholder="Nadano w"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Data nadania:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm datepicker"
            v-model="invoice.issuedDate"
            type="date"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Dni do zapłaty:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm datepicker"
            placeholder="Dni do zapłaty"
            v-model="invoice.daysTillPayment"
            type="number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Metoda płatności:</div>
        <div class="col-2 col-content">
          <select
            class="form-select"
            aria-label="Default select example"
            @change="selectPaymentMethod($event)"
          >
            <option value="Przelew" selected>Przelew</option>
            <option value="Gotówka">Gotówka</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Waluta:</div>
        <div class="col-2 col-content">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="invoice.currency"
            @change="selectCurrency($event)"
          >
            <option v-for="(currency, index) in currencies" :key="index">
              {{ currency }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Zapłacona kwota:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="invoice.paidAmount"
            placeholder="Zapłacona kwota"
            type="number"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-2 offset-4 col-title">Wystawione dla:</div>
        <div class="col-2 col-content">
          <select @change="selectReceivedBy($event)" class="form-select">
            <option v-for="(company, index) in companies" :key="index">
              {{ company.companyName }}
            </option>
          </select>
        </div>
      </div>

      <product-add-form @new-products="appendNewProducts"></product-add-form>

      <div class="row">
        <div class="col-3 offset-5">
          <button
            class="btn btn-sm btn-outline-danger"
            @click.stop.prevent="goBack"
            style="margin-right: 1rem"
          >
            Cofnij
          </button>
          <button
            class="btn btn-sm btn-outline-success"
            @click.stop.prevent="submitForm"
          >
            Dodaj fakturę
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import NavMenu from "../nav/NavMenu.vue";
import InvoiceMenu from "./InvoiceMenu.vue";
import ProductAddForm from "./product/ProductAddForm.vue";

import moment from "moment";

export default {
  components: {
    NavMenu,
    InvoiceMenu,
    ProductAddForm,
  },
  data() {
    return {
      currencies: ["PLN", "EUR", "CZK", "USD", "GBP"],
      invoice: {
        issuedIn: null,
        issuedDate: null,
        daysTillPayment: null,
        paymentMethod: "Przelew",
        currency: null,
        paidAmount: null,
        receivedBy: null,
        products: [],
      },
    };
  },
  computed: {
    companies() {
      let companiesList = this.$store.getters["companies/getAllCompanies"];
      return this.removeMainCompany(companiesList);
    },
  },
  methods: {
    removeMainCompany(companiesList) {
      for (var i = 0; i < companiesList.length; i++) {
        if (companiesList[i].mainCompany === true) {
          companiesList.splice(i, 1);
        }
      }
      return companiesList;
    },
    selectPaymentMethod(event) {
      this.invoice.paymentMethod = event.target.value;
    },
    selectCurrency(event) {
      this.invoice.currency = event.target.value;
    },
    selectReceivedBy(event) {
      var company = this.companies.find((company) => {
        return company.companyName === event.target.value;
      });
      this.invoice.receivedBy = company;
    },
    appendNewProducts(products) {
      this.invoice.products = products;
    },
    goBack() {
      this.$router.replace("/invoices");
    },
    async submitForm() {
      this.formatInvoiceDate();
      await this.$store.dispatch("invoices/addInvoice", this.invoice);
      this.goBack();
    },
    formatInvoiceDate() {
      this.invoice.issuedDate = this.formatDate(this.invoice.issuedDate);
    },
    formatDate(value) {
      return moment(String(value)).format("DD/MM/YYYY HH:mm");
    },
  },
  created() {
    this.$store.dispatch("companies/loadCompanies");
  },
};
</script>

<style scoped>
.row {
  margin-top: 1rem;
}

.col-title {
  text-align: right;
  font-weight: bold;
}

.col-content {
  text-align: left !important;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}
</style>