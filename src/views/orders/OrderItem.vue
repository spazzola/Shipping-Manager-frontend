<template>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <td scope="row">
            <button class="btn btn-sm btn-remove btn-right-margin" @click="deleteOrder">
              <i class="fas fa-times"></i>
            </button>

            <router-link :to="orderDetailsLink"
              ><button
                class="btn btn-sm btn-outline-success btn-font btn-right-margin"
                @click="changeMode"
              >
                Szczegóły
              </button>
            </router-link>
            <button 
            class="btn btn-sm btn-outline-success btn-font btn-right-margin"
            @click="createInvoice"
            v-if="!isInvoiceCreated">
              Wystaw FV
            </button>
            <button 
            class="btn btn-sm btn-outline-success btn-font"
            @click="createPdf"
            >
              Generuj PDF
            </button>
          </td>

          <td scope="row">{{ orderNumber }}</td>
          <td scope="row">{{ createdDate }}</td>
          <td scope="row">{{ shipperInfo }}</td>
          <td scope="row">{{ givenByInfo }}</td>
          <td scope="row">{{ receivedByInfo }}</td>
          <td scope="row">{{ loadingInfo }}</td>
          <td scope="row">{{ unloadingInfo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id", "orderNumber", "createdDate", "shipper", "givenBy", "receivedBy", "loadingInformation", "isInvoiceCreated"],
  computed: {
    orderDetailsLink() {
      return "/order/" + this.id;
    },
    shipperInfo() {
      return this.shipper;
    },
    givenByInfo() {
      //console.log(this.givenBy);
      return this.givenBy.companyName;
    },
    receivedByInfo() {
      return this.receivedBy.companyName;
    },
    loadingInfo() {
      return this.loadingInformation.loadingPlace;
    },
    unloadingInfo() {
      return this.loadingInformation.unloadingPlace;
    }
  },
  methods: {
    async deleteOrder() {
      await this.$store.dispatch("orders/deleteOrder", this.id);
      await this.$store.dispatch("orders/loadOrders");
      this.$router.replace("/orders");
    },
    async createInvoice() {
      let selectedOrder = this.$store.getters[
      "orders/getAllOrders"].find(
      (order) => order.id === parseInt(this.id));

      let createInvoiceRequest = {
        orderId: selectedOrder.id,
        issuedDate: selectedOrder.createdDate,
        daysTillPayment: selectedOrder.daysTillPayment,
        paidAmount: 0,
        issuedIn: selectedOrder.issuedIn,
        paid: false,
        productName: "Usługa transportowa",
        paymentMethod: "Przelew"
      };

      await this.$store.dispatch("invoices/createInvoiceToOrder", createInvoiceRequest);
      await this.$store.dispatch("orders/loadOrders");
    },
    createPdf() {
      this.$store.dispatch("orders/createPdf", this.id);
    }
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
table td:nth-child(1) {
  width: 15%;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6),
table th:nth-child(7) {
  width: 10%;
}

td,
th {
  width: 10%;
  overflow: hidden;
}

table, td {
    padding-left: 0 !important;
  padding-right: 0 !important;
}

.btn-outline-success {
  border-color: #3ec1d3;
  color: #3ec1d3;
  font-weight: bold;
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