<template>
  <div class="content form-group">
    <form>
      <div class="row">
        <div class="col-2 offset-4 col-title">Numer faktury:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="invoice.invoiceNumber"
            :placeholder="selectedInvoice.invoiceNumber"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Nadano w:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="invoice.issuedIn"
            :placeholder="selectedInvoice.issuedIn"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Data wystawienia:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="invoice.issuedDate"
            :placeholder="selectedInvoice.issuedDate"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Wystawione dla:</div>
        <div class="col-2 col-content">
          <select
            v-model="invoice.receivedBy.companyName"
            @change="selectReceivedBy($event)"
            class="form-select"
          >
            <option
              v-for="(company, index) in companies"
              :key="index"
              :selected="selectedInvoice.receivedBy.companyName"
            >
              {{ company.companyName }}
            </option>
          </select>
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
            <option value="transfer" selected>Przelew</option>
            <option value="cash">Gotówka</option>
          </select>
        </div>
      </div>

      <product-form
        :products="selectedInvoice.products"
        :id="selectedInvoice.id"
        :isAddForm="false"
        @products-data="productsData"
        @products-to-delete="prepareProductsToDelete"
      ></product-form>

      <div class="row">
        <div class="col-2 offset-4 col-title">Waluta:</div>
        <div class="col-2 col-content">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="invoice.currency"
            @change="selectCurrency($event)"
          >
            <option
              v-for="(currency, index) in currencies"
              :key="index"
              :selected="selectedInvoice.currency"
            >
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
            v-model="invoice.paidAmount"
            :placeholder="selectedInvoice.paidAmount"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Zapłacona:</div>
        <div class="col-2 col-content">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="invoice.isPaid"
            @change="selectPaid($event)"
          >
            <option
              v-for="(paidCondition, index) in paidConditions"
              :key="index"
              :selected="selectedInvoice.paid"
            >
              {{ paidCondition }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-2 offset-4 col-title">Dni do zapłaty:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model="invoice.daysTillPayment"
            :placeholder="selectedInvoice.daysTillPayment"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-5">
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
              style="margin-left: 1rem"
            >
              Cofnij
            </button>
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ProductForm from "./product/ProductForm.vue";

export default {
  props: ["selectedInvoice"],
  components: {
    ProductForm,
  },
  data() {
    return {
      invoice: {
        id: null,
        invoiceNumber: null,
        issuedIn: null,
        issuedDate: null,
        receivedBy: {},
        paymentMethod: null,
        products: [],
        paidAmount: null,
        isPaid: null,
      },
      currencies: ["PLN", "EUR", "CZK", "USD", "GBP"],
      paidConditions: ["Tak", "Nie"],
      productsToDelete: []
    };
  },
  computed: {
    companies() {
      return this.$store.getters["companies/getAllCompanies"];
    },
    previousPath() {
      return "/invoice/" + this.id;
    },
  },
  methods: {
    selectReceivedBy(event) {
      var company = this.companies.find((company) => {
        return company.companyName === event.target.value;
      });
      this.invoice.receivedBy = company;
    },
    selectPaymentMethod(event) {
      this.invoice.paymentMethod = event.target.value;
    },
    productsData(products) {
      this.invoice.products = products;
      console.log(products)
    },
    selectCurrency(event) {
      this.invoice.currency = event.target.value;
    },
    switchBooleanToString(booleanCondition) {
      if (booleanCondition === true) {
        return "Tak";
      } else {
        return "Nie";
      }
    },
    async goToPreviousPage() {
      this.$emit("clicked");
      this.$router.replace("/invoice/" + this.selectedInvoice.id);
    },
    async submitForm() {
      this.invoice.id = this.selectedInvoice.id;
      if (this.invoice.invoiceNumber === null) {
          this.invoice.invoiceNumber = this.selectedInvoice.invoiceNumber;
      }
      if (this.invoice.issuedIn === null) {
          this.invoice.issuedIn = this.selectedInvoice.issuedIn;
      }
      if (this.invoice.issuedDate === null) {
          this.invoice.issuedDate = this.selectedInvoice.issuedDate;
      }
      if (this.invoice.paymentMethod === null) {
          this.invoice.paymentMethod = this.selectedInvoice.paymentMethod;
      }
      if (this.invoice.products === null) {
          this.invoice.products = this.selectedInvoice.products;
      }
      if (this.invoice.paidAmount === null) {
          this.invoice.paidAmount = this.selectedInvoice.paidAmount;
      }
      if (this.productsToDelete.length > 0) {
        await this.$store.dispatch("products/deleteProducts", this.productsToDelete);
      }

      await this.$store.dispatch("invoices/updateInvoice", this.invoice);
      await this.$store.dispatch("invoices/loadInvoice", this.invoice.id);
      this.goToPreviousPage();
    },
    prepareProductsToDelete(productsToDelete) {
      this.productsToDelete = productsToDelete;
    }
  },
  created() {
    this.$store.dispatch("companies/loadCompanies");
    this.invoice.currency = this.selectedInvoice.currency;
    this.invoice.isPaid = this.switchBooleanToString(this.selectedInvoice.paid);
    this.invoice.receivedBy = this.selectedInvoice.receivedBy;
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

.row-top-margin {
  margin-top: 2rem;
}
</style>