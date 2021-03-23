<template>
  <nav-menu></nav-menu>
  <order-menu @changeToMyOrAllOrders="changeOrders" @changeToGivenOrReceivedOrders="changeOrders"></order-menu>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          
          <th scope="col">Numer zamówienia</th>
          <th scope="col">Data utworzenia</th>
          <th scope="col">Spedytor</th>
          <th scope="col">Wystawione przez</th>
          <th scope="col">Odebrane przez</th>
          <th scope="col">Miejsce / data załadunku</th>
          <th scope="col">Miejsce / data rozładunku</th>
        </tr>
      </thead>
    </table>

    <div v-if="!showBackButton">
      <order-item
        v-for="order in allOrders"
        :key="order.id"
        :id="order.id"
        :isInvoiceCreated="order.isInvoiceCreated"
        :orderNumber="order.orderNumber"
        :createdDate="order.createdDate"
        :shipper="order.shipper"
        :givenBy="order.givenBy"
        :receivedBy="order.receivedBy"
        :loadingInformation="order.loadingInformation"
      ></order-item>
    </div>
  </div>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import OrderMenu from "./OrderMenu.vue";
import OrderItem from './OrderItem.vue';

export default {
  components: {
    NavMenu,
    OrderMenu,
    OrderItem
  },
  data() {
    return {
      status: {
        showAllOrders: true,
        showGivenOrders: true,
      }
    }
  },
  computed: {
    allOrders() {
      return this.$store.getters["orders/getAllOrders"];
    }
  },
  methods: {
    changeOrders(status) {
      if (status.showAllOrders === true) {
        // show all orders
      } else {
        // show my orders
      }

      if (status.showGivenOrders === true) {
        // show given orders
      } else {
        // show received orders
      }
      this.status.showAllOrders = status;
    },
  },
  created() {
    console.log(this.$store.getters["orders/getAllOrders"]);
    this.$store.dispatch("orders/loadOrders");
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

table th:nth-child(1) {
  width: 20%;
}
table th:nth-child(2) {
  width: 30%;
}

table th:nth-child(3),
table th:nth-child(4),
table th:nth-child(5),
table th:nth-child(6),
table th:nth-child(7),
table th:nth-child(8),
table th:nth-child(9),
table th:nth-child(10)  {
  width: 33%;
}

td,
th {
  width: 25%;
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