<template>
  <nav-menu></nav-menu>
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
  <div>
    <order-form
      v-show="showOrderForm"
      @order-data="orderData"
      :buttonText="'Dalej'"
    ></order-form>
  </div>

  <div v-show="showCompanyForm">
    <div class="row additional-margin">
      <div class="col-2 offset-4 col-title">Rodzaj zamówienia:</div>
      <div class="col-1 col-content">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="selectOrderType($event)"
        >
          <option value="GIVEN">Nadane</option>
          <option value="RECEIVED">Odebrane</option>
        </select>
      </div>
    </div>

    <div class="row additional-margin">
      <div class="col-3 offset-5 col-title">
        <p>Wybierz firmę bądź uzupełnij formularz</p>
      </div>
    </div>

    <div v-if="order.orderType === 'GIVEN'">
      <div class="row additional-margin">
        <div class="col-2 offset-4 col-title">Odbiorca zlecenia</div>
        <div class="col-2 col-content">
          <select v-model="selectedCompany.company" class="form-select">
            <option value="NONE" selected>Wybierz ręcznie</option>
            <option
              v-bind:value="{
                id: company.id,
                companyName: company.companyName,
              }"
              v-for="company in companies"
              v-bind:key="company.id"
            >
              {{ company.companyName }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="order.orderType === 'RECEIVED'">
      <div class="row additional-margin">
        <div class="col-2 offset-4 col-title">Nadawca zlecenia</div>
        <div class="col-2 col-content">
          <select v-model="selectedCompany.company" class="form-select">
            <option value="NONE" selected>Wybierz ręcznie</option>
            <option
              v-bind:value="{
                id: company.id,
                companyName: company.companyName,
              }"
              v-for="company in companies"
              v-bind:key="company.id"
            >
              {{ company.companyName }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <company-form
      @company-data="companyData"
      :buttonText="'Dalej'"
      :showBackButton="true"
      @go-back="goBack"
    ></company-form>
  </div>

  <driver-form
    v-for="index in driversToAdd"
    :key="index"
    v-show="showDriverForm"
    :buttonText="'Dodaj zlecenie'"
    :showBackButton="true"
    @driver-data="driverData"
    @go-back="goBack"
  ></driver-form>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import OrderForm from "./OrderForm.vue";
import DriverForm from "../drivers/DriverForm.vue";
import CompanyForm from "../merhants/CompanyForm.vue";

export default {
  components: {
    NavMenu,
    OrderForm,
    DriverForm,
    CompanyForm,
  },
  data() {
    return {
      selectedCompany: {
        company: {
          id: null,
        },
      },
      newCompany: null,
      currentProgress: "Szczegóły zamówienia",
      progressWidth: 33.33,
      showOrderForm: true,
      showCompanyForm: false,
      showDriverForm: false,
      driversToAdd: 1,
      order: {
        createdDate: null,
        paymentDate: null,
        value: null,
        weight: null,
        issuedIn: null,
        currency: null,
        daysTillPayment: null,
        description: null,
        comment: null,
        orderType: "GIVEN",
        receivedById: null,
        givenById: null,
        drivers: [],
        loadingInformation: {},
        shipper: null
      },
    };
  },
  computed: {
    companies() {
      return this.$store.getters["companies/getAllCompanies"];
    },
    width() {
      return "width: " + this.progressWidth + "%;";
    },
    isLastElement() {
      if (this.driversToAdd === 1) {
        return true;
      }
      return this.driversToAdd % 2 != 0;
    },
  },
  methods: {
    orderData(order) {
      this.updateProgressBarAfterOrderForm();
      this.order.createdDate = order.createdDate;
      this.order.value = order.value;
      this.order.weight = order.weight;
      this.order.issuedIn = order.issuedIn;
      this.order.currency = order.currency;
      this.order.daysTillPayment = order.daysTillPayment;
      this.order.description = order.description;
      this.order.comment = order.comment;
      this.order.loadingInformation = order.loadingInformation;
      this.assignShipperToOrder();
    },
    assignShipperToOrder() {
      let name = localStorage.getItem("name");
      let surname = localStorage.getItem("surname");
      this.order.shipper = name + " " + surname;
    },
    async companyData(company) {
      this.updateProgressBarAfterCompanyForm();
      if (this.selectedCompany.company.id != null) {
        this.assignCompanyToOrder(this.selectedCompany.company);
      } else {
        this.newCompany = company;
      }
    },
    driverData(drivers) {
      this.order.drivers = drivers;
      this.submitForm();
    },
    addNextDriver() {
      if (this.driversToAdd >= 2) {
        this.driversToAdd -= 1;
      } else {
        this.driversToAdd += 1;
      }
    },
    async submitForm() {
      if (this.newCompany != null) {
        await this.$store.dispatch("companies/addCompany", this.newCompany);
        await this.$store.dispatch("companies/loadCompanies");
        let createdCompany = this.$store.getters[
          "companies/getAllCompanies"
        ].find(
          (company) => company.companyName === this.newCompany.companyName
        );
        this.assignCompanyToOrder(createdCompany);
        await this.$store.dispatch("orders/addOrder", this.order);
        // loadCompanies, getCompany id by searching companyName and then assign it to order
      } else {
        this.assignCompanyToOrder(this.selectedCompany.company);
        await this.$store.dispatch("orders/addOrder", this.order);
      }
      await this.$store.dispatch("orders/loadOrders");
      this.$router.replace("/orders");
    },
    assignCompanyToOrder(company) {
      if (this.order.orderType === "GIVEN") {
        this.order.receivedById = company.id;
      }
      if (this.order.orderType === "RECEIVED") {
        this.order.givenById === company.id;
      }
    },
    goBack() {
      if (this.showCompanyForm === true) {
        this.showCompanyForm = false;
        this.showOrderForm = true;
        this.progressWidth -= 33.33;
        this.currentProgress = "Szczegóły zamówienia";
      }

      if (this.showDriverForm === true) {
        this.showDriverForm = false;
        this.showCompanyForm = true;
        this.progressWidth -= 33.33;
        this.currentProgress = "Zleceniodawca / Zleceniobiorca";
      }
    },
    selectOrderType(event) {
      this.order.orderType = event.target.value;
    },
    updateProgressBarAfterOrderForm() {
      this.progressWidth += 33.33;
      this.currentProgress = "Zleceniodawca / Zleceniobiorca";
      this.showOrderForm = false;
      this.showCompanyForm = true;
    },
    updateProgressBarAfterCompanyForm() {
      this.currentProgress = "Kierowcy";
      this.progressWidth += 33.33;
      this.showCompanyForm = false;
      this.showDriverForm = true;
    },
  },
  created() {
    this.$store.dispatch("companies/loadCompanies");
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

.additional-margin {
  margin-top: 2rem;
}

.button-row {
  margin-top: -0.5rem !important;
  margin-bottom: 2rem;
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

p {
  font-size: 1.3rem;
}
</style>