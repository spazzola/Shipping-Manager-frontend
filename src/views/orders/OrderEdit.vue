<template>
  <div class="form-group">
    <form>
      <div class="progress">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          :style="width"
          aria-valuenow="33"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ currentProgress }}
        </div>
      </div>

      <div v-show="showOrderInfo">
        <order-info
          :selectedOrder="selectedOrder"
          v-show="showOrderInfo"
          @order-info="orderInfo"
        ></order-info>
      </div>

      <div v-show="showLoadingInfo">
        <loading-info
          :loadingInfo="selectedOrder.loadingInformation"
          @loading-info="loadingInfo"
          @go-back="goBack"
        ></loading-info>
      </div>

      <div v-show="showDriversInfo">
        <drivers-info
          :selectedOrder="selectedOrder"
          @drivers-info="driversInfo"
          @go-back="goBack"
        ></drivers-info>
      </div>
    </form>
  </div>
</template>

<script>
import OrderInfo from "./edit-forms/OrderInfo.vue";
import LoadingInfo from "./edit-forms/LoadingInfo.vue";
import DriversInfo from "./edit-forms/DriversInfo.vue";

export default {
  props: ["id", "selectedOrder"],
  components: {
    OrderInfo,
    LoadingInfo,
    DriversInfo,
  },
  data() {
    return {
      selectedCompany: {
        company: {
          id: null,
        },
      },
      progressWidth: 33.33,
      currentProgress: "Szczegóły zamówienia",
      showOrderInfo: true,
      showLoadingInfo: false,
      showDriversInfo: false,
      order: {
        orderType: null,
        givenById: null,
        receivedById: null,
        issuedIn: null,
        description: null,
        value: null,
        currency: null,
        weight: null,
        shipper: null,
        createdDate: null,
        paymentDate: null,
        comment: null,
        drivers: [],
        loadingInformation: {},
      },
    };
  },
  computed: {
    previousPath() {
      return "/order/" + this.id;
    },
    companies() {
      return this.$store.getters["companies/getAllCompanies"];
    },
    width() {
      return "width: " + this.progressWidth + "%;";
    },
  },
  methods: {
    orderInfo(order) {
      this.updateProgressBarAfterOrderInfo();
      this.order.orderType = order.orderType;
      this.order.givenById = order.givenById;
      this.order.receivedById = order.receivedById;
      this.order.issuedIn = order.issuedIn;
      this.order.description = order.description;
      this.order.value = order.value;
      this.order.currency = order.currency;
      this.order.weight = order.weight;
      this.order.shipper = order.shipper;
      this.order.createdDate = order.createdDate;
      this.order.paymentDate = order.paymentDate;
      this.order.comment = order.comment;
    },
    loadingInfo(loadingInformation) {
      this.updateProgressBarAfterLoadingInfo();
      this.order.loadingInformation = loadingInformation;
    },
    driversInfo(drivers) {
      this.order.drivers = [];
      drivers.forEach((driver) => {
        this.order.drivers.push(driver.driver);
      });
      this.submitForm();
    },
    async submitForm() {
      this.showDriversInfo = false;
      await this.$store.dispatch("orders/setOrder", this.order);
      await this.$store.dispatch("orders/updateOrder", this.order);
      await this.$store.dispatch("orders/loadOrder", this.id);
      this.goToPreviousPage();
    },
    updateProgressBarAfterOrderInfo() {
      this.progressWidth += 33.33;
      this.currentProgress = "Informacje o załadunku";
      this.showOrderInfo = false;
      this.showLoadingInfo = true;
    },
    updateProgressBarAfterLoadingInfo() {
      this.progressWidth += 33.33;
      this.currentProgress = "Informacje o kierowcach";
      this.showLoadingInfo = false;
      this.showDriversInfo = true;
    },
    goBack() {
      if (this.showLoadingInfo === true) {
        this.showLoadingInfo = false;
        this.showOrderInfo = true;
        this.progressWidth -= 33.33;
        this.currentProgress = "Szczegóły zamówienia";
      }

      if (this.showDriversInfo === true) {
        this.showDriversInfo = false;
        this.showLoadingInfo = true;
        this.progressWidth -= 33.33;
        this.currentProgress = "Informacje o załadunku";
      }
    },
    async goToPreviousPage() {
      this.$emit("clicked");
      this.$router.push("/order/" + this.selectedOrder.id);
    },
  },
  created() {
    this.$store.dispatch("companies/loadCompanies");
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

.additional-top-margin {
  margin-top: 1rem;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}

.progress {
  height: 1.5rem;
  width: 50%;
  margin: auto;
  font-size: 1rem;
  font-weight: bold;
}
</style>