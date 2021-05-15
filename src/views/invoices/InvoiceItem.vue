<template>
  <base-alert v-if="showAlert" title="Potwierdź czynność">
    <template #default>
      <p>Czy napewno chcesz usunąć fakturę?</p>
    </template>
    <template #actions>
      <base-button
        @click="confirmAlert"
        :buttonType="'confirm'"
        :buttonText="'Tak'"
      ></base-button>
      <base-button
        @click="rejectAlert"
        :buttonType="'reject'"
        :buttonText="'Nie'"
      ></base-button>
    </template>
  </base-alert>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <td scope="row">
            <button class="btn btn-sm btn-remove" @click="deleteInvoice">
              <i class="fas fa-times"></i>
            </button>

            <button
              v-if="!paid"
              class="btn btn-sm btn-outline-success btn-font"
              style="float: right"
              @click="payForInvoice"
            >
              Zapłać
            </button>
            <button
              class="btn btn-sm btn-outline-success btn-font btn-right-margin"
              style="float: right"
              @click="createPdf"
            >
              Generuj PDF
            </button>
            <router-link :to="invoiceDetailsLink"
              ><button
                class="btn btn-sm btn-outline-success btn-font btn-right-margin"
                style="float: right"
                @click="changeMode"
              >
                Szczegóły
              </button>
            </router-link>
          </td>
          <td scope="row">{{ invoiceNumber }}</td>
          <td scope="row">{{ issuedDate }}</td>
          <td scope="row">{{ valueWithoutTax }}</td>
          <td scope="row">{{ valueWithTax }}</td>
          <td scope="row" :style="paid ? 'color: green' : 'color: red'">
            {{ isPaid }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "invoiceNumber",
    "issuedDate",
    "valueWithoutTax",
    "valueWithTax",
    "paid",
  ],
  data() {
    return {
      showAlert: false,
      isConfirmed: false,
    };
  },
  computed: {
    invoiceDetailsLink() {
      return "/invoice/" + this.id;
    },
    isPaid() {
      if (this.paid === true) {
        return "Tak";
      } else {
        return "Nie";
      }
    },
  },
  methods: {
    async deleteInvoice() { 
      this.showAlert = true;
      if (this.isConfirmed) {
        await this.$store.dispatch("invoices/deleteInvoice", this.id);
        await this.$store.dispatch("invoices/loadInvoices", this.id);
      }
    },
    createPdf() {
      this.$store.dispatch("invoices/createPdf", this.id);
    },
    async payForInvoice() {
      await this.$store.dispatch("invoices/payForInvoice", this.id);
      await this.$store.dispatch("invoices/loadInvoices");
    },
    confirmAlert() {
      this.isConfirmed = true;
      this.showAlert = false;
      this.deleteInvoice();
    },
    rejectAlert() {
      this.isConfirmed = false;
      this.showAlert = false;
    },
  },
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

table,
td {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6) {
  width: 25%;
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
  font-size: 1rem;
  color: red !important;
}

.btn-right-margin {
  margin-right: 0.3rem;
}

@media (max-width: 1890px) {
  .btn-font {
    font-size: 0.7rem;
  }
  .btn-right-margin {
    margin-right: 0;
  }
}
</style>