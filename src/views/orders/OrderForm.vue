<template>
  <div class="content form-group">
    <form>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Opis ładunku:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Opis ładunku"
            v-model.trim="order.description"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Miejsce nadania:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Miejsce nadania"
            v-model.trim="order.issuedIn"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Data nadania:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm datepicker"
            type="date"
            v-model.trim="order.createdDate"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Wartość:</div>
        <div class="col-1 col-content">
          <input
            class="form-control form-control-sm"
            placeholder="Wartość"
            v-model.trim="order.value"
            step="0.01"
            type="number"
          />
        </div>

        <div class="col-1 col-content">
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

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Waga:</div>
        <div class="col-1 col-content">
          <input
            class="form-control form-control-sm"
            placeholder="Waga (kg)"
            v-model.trim="order.weight"
            type="number"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Dni do zapłaty:</div>
        <div class="col-1 col-content">
          <input
            class="form-control form-control-sm"
            placeholder="Dni"
            v-model.trim="order.daysTillPayment"
            type="number"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Miejsce załadunku:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Miasto, kod pocztowy, ulica, numer budynku"
            v-model.trim="order.loadingInformation.loadingPlace"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">
          Najwcześniejsza data załadunku:
        </div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            v-model.trim="order.loadingInformation.minLoadingDate"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">
          Najpóźniejsza data załadunku:
        </div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            v-model.trim="order.loadingInformation.maxLoadingDate"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Miejsce rozładunku:</div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Miasto, kod pocztowy, ulica, numer budynku"
            v-model.trim="order.loadingInformation.unloadingPlace"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">
          Najwcześniejsza data rozładunku:
        </div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            v-model.trim="order.loadingInformation.minUnloadingDate"
          />
        </div>
      </div>
      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">
          Najpóźniejsza data rozładunku:
        </div>
        <div class="col-2 col-content">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            v-model.trim="order.loadingInformation.maxUnloadingDate"
          />
        </div>
      </div>

      <div class="row row-top-margin">
        <div class="col-2 offset-4 col-title">Komentarz:</div>
        <div class="col-2 col-content">
          <textarea
            class="form-control form-control-sm"
            placeholder="Komentarz do zamówienia"
            v-model.trim="order.comment"
            type="text"
            rows="4"
          />
        </div>
      </div>
      <button
        class="btn btn-sm btn-outline-success"
        @click.stop.prevent="submitForm"
      >
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["buttonText"],
  data() {
    return {
      selectedCompany: {
        company: {
          id: null,
        },
      },
      order: {
        createdDate: null,
        paymentDate: null,
        value: null,
        weight: null,
        issuedIn: null,
        currency: "PLN",
        daysTillPayment: null,
        description: null,
        comment: null,
        orderType: null,
        receivedBy: null,
        givenBy: null,
        drivers: [],
        loadingInformation: {
          loadingPlace: null,
          unloadingPlace: null,
          minLoadingDate: null,
          maxLoadingDate: null,
          minUnloadingDate: null,
          maxUnloadingDate: null,
        },
      },
    };
  },
  computed: {
    companies() {
      return this.$store.getters["companies/getAllCompanies"];
    },
  },
  methods: {
    selectCurrency(event) {
      this.order.currency = event.target.value;
    },
    selectOrderType(event) {
      this.order.orderType = event.target.value;
    },
    submitForm() {
      this.order.createdDate += " 00:00";
      this.formatOrderDates();
      this.$emit("order-data", this.order);
    },
    formatOrderDates() {
      this.order.createdDate = this.formatDate(this.order.createdDate);
    },
    formatDate(value) {
      return moment(String(value)).format("DD/MM/YYYY HH:MM");
    },
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

.btn {
  margin-top: 2rem;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}
</style>