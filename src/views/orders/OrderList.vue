<template>
  <nav-menu></nav-menu>
  <order-menu
    @changeToMyOrAllOrders="changeOrders"
    @changeToGivenOrReceivedOrders="changeOrders"
    @sortByProperty="changeOrders"
  ></order-menu>
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
        v-for="order in orders"
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
import OrderItem from "./OrderItem.vue";

export default {
  components: {
    NavMenu,
    OrderMenu,
    OrderItem,
  },
  data() {
    return {
      status: {
        allOrders: true,
        givenOrders: true,
        showBackButton: false,
        selectBy: {
          by: "none",
          value: null,
        },
      },
    };
  },
  computed: {
    showAllOrders() {
      return this.status.allOrders;
    },
    showGivenOrders() {
      return this.status.givenOrders;
    },
    orders() {
      let resultOrders = [];
      if (this.showAllOrders === true) {
        resultOrders = resultOrders.concat(
          this.$store.getters["orders/getAllOrders"]
        );
      }

      if (this.showAllOrders === false) {
        resultOrders = [];
        let name = localStorage.getItem("name");
        let surname = localStorage.getItem("surname");
        let shipper = name + " " + surname;

        resultOrders = resultOrders.concat(
          this.$store.getters["orders/getAllOrders"].filter(
            (order) => order.shipper === shipper
          )
        );
      }

      if (this.showAllOrders === true && this.showGivenOrders === true) {
        resultOrders = resultOrders.filter(
          (order) => order.orderType === "GIVEN"
        );
      }
      if (this.showAllOrders === true && this.showGivenOrders === false) {
        resultOrders = resultOrders.filter(
          (order) => order.orderType === "RECEIVED"
        );
      }

      if (this.showAllOrders === false && this.showGivenOrders === true) {
        resultOrders = resultOrders.filter(
          (order) => order.orderType === "GIVEN"
        );
      }
      if (this.showAllOrders === false && this.showGivenOrders === false) {
        resultOrders = resultOrders.filter(
          (order) => order.orderType === "RECEIVED"
        );
      }

      if (this.status.selectBy.by === "companyName") {
        let companyName = this.status.selectBy.value;
        resultOrders = resultOrders.filter(
          (order) =>
            order.givenBy.companyName.includes(companyName) ||
            order.receivedBy.companyName.includes(companyName)
        );
      }
      if (this.status.selectBy.by === "nip") {
        let nip = this.status.selectBy.value;
        resultOrders = resultOrders.filter(
          (order) =>
            order.givenBy.nip.includes(nip) ||
            order.receivedBy.nip.includes(nip)
        );
      }

      return resultOrders;
    },
  },
  methods: {
    changeOrders(status) {
      if (status.showAllOrders === true) {
        this.status.allOrders = true;
      } else {
        this.status.allOrders = false;
      }

      if (status.showGivenOrders === true) {
        this.status.givenOrders = true;
      } else {
        this.status.givenOrders = false;
      }
      this.status.selectBy = status.selectBy;
      console.log(this.status.selectBy);
    },
  },
  created() {
    this.$store.dispatch("orders/loadOrders");
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
table th:nth-child(10) {
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