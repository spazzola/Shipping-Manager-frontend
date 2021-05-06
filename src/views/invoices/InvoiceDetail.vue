<template>
  <nav-menu></nav-menu>
  <invoice-menu></invoice-menu>
  <div class="content" v-if="!editMode" style="margin-top: -2rem">
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Numer faktury:</div>
      <div class="col-2 col-content">{{ currentInvoice.invoiceNumber }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Nadano w:</div>
      <div class="col-2 col-content">{{ currentInvoice.issuedIn }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Data wystawienia:</div>
      <div class="col-2 col-content">{{ currentInvoice.issuedDate }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Wystawiona dla:</div>
      <div class="col-2 col-content">
        {{ currentInvoice.receivedBy.companyName }}
      </div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-6 col-content">
        NIP: {{ currentInvoice.receivedBy.nip }}
      </div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Metoda płatności:</div>
      <div class="col-2 col-content">{{ currentInvoice.paymentMethod }}</div>
    </div>

    <div class="row-top-margin">
      <div class="col-2 offset-4 col-title">Sprzedane usługi:</div>
      <product-info 
      :products="currentInvoice.products"
      :currency="currentInvoice.currency"></product-info>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Wartość netto:</div>
      <div class="col-2 col-content">{{ currentInvoice.valueWithoutTax }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Wartość brutto:</div>
      <div class="col-2 col-content">{{ currentInvoice.valueWithTax }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Waluta:</div>
      <div class="col-2 col-content">{{ currentInvoice.currency }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Zapłacona kwota:</div>
      <div class="col-2 col-content">{{ currentInvoice.paidAmount }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Zostało do zapłaty:</div>
      <div class="col-2 col-content">{{ currentInvoice.amountToPay }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Zapłacona:</div>
      <div class="col-2 col-content">{{ isPaid }}</div>
    </div>
  </div>

  <router-view v-else style="margin-top: -2rem">
    <invoice-edit 
    :selectedInvoice="selectedInvoice"
    @clicked="switchMode"> </invoice-edit>
  </router-view>

  <div class="row row-top-margin row-bottom-margin">
      <div class="col-2 offset-5">
        <router-link :to="editInvoice" v-if="!editMode"
          ><button class="btn btn-sm btn-outline-success" @click="switchMode">
            Edytuj
          </button></router-link
        >
      </div>
    </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import InvoiceMenu from "./InvoiceMenu.vue";
import InvoiceEdit from "./InvoiceEdit.vue";
import ProductInfo from "./product/ProductInfo.vue"

export default {
  components: {
    NavMenu,
    InvoiceMenu,
    InvoiceEdit,
    ProductInfo
  },
  props: ["id"],
  data() {
    return {
      selectedInvoice: null,
      editMode: false,
    };
  },
  computed: {
    currentInvoice() {
      if (this.$store.getters["invoices/getInvoice"] === null) {
        return this.selectedInvoice;
      } else {
        return this.$store.getters["invoices/getInvoice"];
      }
    },
    isPaid() {
      if (this.currentInvoice.paid === true) {
        return "Tak";
      } else {
        return "Nie";
      }
    },
    isEditMode() {
      return this.editMode;
    },
    editInvoice() {
      return this.$route.path + "/edit";
    },
  },
  methods: {
    switchMode() {
      this.editMode = !this.editMode;
    }
  },
  created() {
    this.selectedInvoice = this.$store.getters["invoices/getAllInvoices"].find(
      (invoice) => invoice.id === parseInt(this.id)
    );
  },
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

.row-bottom-margin {
  margin-bottom: 3rem;
}

p {
  text-align: left;
  margin-bottom: 0;
  font-weight: bold;
}

.btn {
  margin-left: 5%;
}
</style>