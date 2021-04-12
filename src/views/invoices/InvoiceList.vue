<template>
  <nav-menu></nav-menu>
  <invoice-menu></invoice-menu>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>

          <th scope="col">Numer faktury</th>
          <th scope="col">Data wystawienia</th>
          <th scope="col">Wartość netto</th>
          <th scope="col">Wartość brutto</th>
          <th scope="col">Zapłacono</th>
        </tr>
      </thead>
    </table>

    <div>
      <invoice-item
        v-for="invoice in invoices"
        :key="invoice.id"
        :id="invoice.id"
        :invoiceNumber="invoice.invoiceNumber"
        :issuedDate="invoice.issuedDate"
        :valueWithoutTax="invoice.valueWithoutTax"
        :valueWithTax="invoice.valueWithTax"
        :paid="invoice.paid"
      ></invoice-item>
    </div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import InvoiceMenu from "./InvoiceMenu.vue";
import InvoiceItem from "./InvoiceItem.vue";

export default {
  components: {
    NavMenu,
    InvoiceMenu,
    InvoiceItem
  },
  computed: {
      invoices() {
          return this.$store.getters["invoices/getAllInvoices"];
      }
  },
  created() {
      this.$store.dispatch("invoices/loadInvoices");
  }
};
</script>

<style scoped>
.content {
  position: relative;
  margin: 2% 0 0 1%;
  text-align: left;
  width: 98%;
  margin-right: 5%;
  overflow-x: scroll;
}
table {
  width: 100%;
  table-layout: fixed;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6),
table th:nth-child(7) {
  width: 30%;
}

td,
th {
  width: 15%;
  overflow: hidden;
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

.btn-remove {
  margin-right: 5%;
  font-size: 1rem;
  color: red !important;
}
</style>