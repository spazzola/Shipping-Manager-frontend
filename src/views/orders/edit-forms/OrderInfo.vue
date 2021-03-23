<template>
  <form>
    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o zamówieniu</h4>
      </div>
    </div>
    <!-- <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Numer zamówienia:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            v-model.trim="order.orderNumbers"
            :placeholder="selectedOrder.orderNumber"
          />
        </div>
      </div> -->

    <div class="row additional-margin">
      <div class="col-2 offset-4 col-title">Rodzaj zamówienia:</div>
      <div class="col-1 col-content">
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="selectedOrderType.orderType"
          @change="selectOrderType($event)"
        >
          <option value="GIVEN">Nadane</option>
          <option value="RECEIVED">Odebrane</option>
        </select>
      </div>
    </div>

    <div v-if="selectedOrderType.orderType === 'GIVEN'">
      <div class="row additional-margin">
        <div class="col-2 offset-4 col-title">Odbiorca zlecenia</div>
        <div class="col-2 col-content">
          <select v-model="receivedByCompany.companyName" @change="selectReceivedBy($event)" class="form-select">
            <option 
            v-for="(company, index) in companies" 
            :key="index"
            :selected="givenByCompany.companyName"
            >
              {{ company.companyName }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="selectedOrderType.orderType === 'RECEIVED'">
      <div class="row additional-margin">
        <div class="col-2 offset-4 col-title">Nadawca zlecenia</div>
        <div class="col-2 col-content">
          <select v-model="givenByCompany.companyName" @change="selectGivenBy($event)" class="form-select">
            <option 
            v-for="(company, index) in companies" 
            :key="index"
            :selected="givenByCompany.companyName"
            >
              {{ company.companyName }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Nadano w:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.issuedIn"
          :placeholder="selectedOrder.issuedIn"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Opis:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.description"
          :placeholder="selectedOrder.description"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Wartość:</div>
      <div class="col-1 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.value"
          :placeholder="selectedOrder.value"
        />
        <div class="col-1 col-content" style="margin-top: 0.5rem;">
          <select
            class="form-select"
            aria-label="Default select example"
            @change="selectCurrency($event)"
          >
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
            <option value="CZK">CZK</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Waga:</div>
      <div class="col-1 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.weight"
          :placeholder="selectedOrder.weight"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Spedytor:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.shipper"
          :placeholder="selectedOrder.shipper"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Data nadania:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.createdDate"
          :placeholder="selectedOrder.createdDate"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Data płatności:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="order.paymentDate"
          :placeholder="selectedOrder.paymentDate"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Komentarz:</div>
      <div class="col-2 col-content">
        <textarea
          class="form-control form-control-sm"
          v-model.trim="order.comment"
          :placeholder="selectedOrder.comment"
          rows="4"
        />
      </div>
    </div>
    <button
      class="btn btn-sm btn-outline-success"
      @click.stop.prevent="submitForm"
      style="margin-top: 1.5rem"
    >
      Dalej
    </button>
  </form>
</template>

<script>
export default {
  props: ["selectedOrder"],
  data() {
    return {
      givenByCompany: {},
      receivedByCompany: {},
      selectedOrderType: {
        orderType: null,
      },
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
    
        //daysTillPayment: null,
      },
    };
  },
  methods: {
    submitForm() {
      if (this.order.orderType != null) {
        this.order.orderType = this.selectedOrderType.orderType;
      } else {
        this.order.orderType = this.selectedOrder.orderType;
      }
      
      // if (this.order.orderType === 'RECEIVED')  {
      //   this.order.givenById = this.givenByCompany.id;
      //   this.order.receivedById = this.receivedByCompany.id;
      // }

      // if (this.order.orderType === 'GIVEN') {
      //   this.order.receivedById = this.selectedOrder.receivedByCompany.id;
      // }

      if (this.order.issuedIn === null) {
        this.order.issuedIn = this.selectedOrder.issuedIn;
      }

      if (this.order.description === null) {
        this.order.description = this.selectedOrder.description;
      }

      if (this.order.value === null) {
        this.order.value = this.selectedOrder.value;
      }

      if (this.order.currency === null) {
        this.order.currency = this.selectedOrder.currency;
      }

      if (this.order.weight === null) {
        this.order.weight = this.selectedOrder.weight;
      }

      if (this.order.shipper === null) {
        this.order.shipper = this.selectedOrder.shipper;
      }

      if (this.order.createdDate === null) {
        this.order.createdDate = this.selectedOrder.createdDate;
      }

      if (this.order.paymentDate === null) {
        this.order.paymentDate = this.selectedOrder.paymentDate;
      }

      if (this.order.comment === null) {
        this.order.comment = this.selectedOrder.comment;
      }

      this.$emit("order-info", this.order);
    },
    selectOrderType(event) {
      this.order.orderType = event.target.value;
    },
    selectCurrency(event) {
      this.order.currency = event.target.value;
    },
    selectGivenBy(event) {
     var company = this.companies.find(company => {
       return company.companyName === event.target.value
     });
     this.order.givenById = company.id;
    },
    selectReceivedBy(event) {
      var company = this.companies.find(company => {
        return company.companyName === event.target.value;
      });
      this.order.receivedById = company.id;
    }
  },
  computed: {
    companies() {
      return this.$store.getters["companies/getAllCompanies"];
    },
  },
  created() {
    this.givenByCompany = this.selectedOrder.givenBy;
    this.order.givenById = this.selectedOrder.givenBy.id;

    this.receivedByCompany = this.selectedOrder.receivedBy;
    this.order.receivedById = this.selectedOrder.receivedBy.id;

    this.selectedOrderType.orderType = this.selectedOrder.orderType.toUpperCase();
  },
  updated() {
    //console.log(this.$store.getters["companies/getAllCompanies"]);
  }
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
</style>