<template>
  <nav-menu></nav-menu>
  <div class="content" v-if="!isEditMode">
    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o zamówieniu</h4>
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Numer zamówienia:</div>
      <div class="col-2 col-content">{{ orderNumber }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Nadane przez:</div>
      <div class="col-2 col-content">{{ givenBy }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Odebrane przez:</div>
      <div class="col-2 col-content">{{ receivedBy }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Opis:</div>
      <div class="col-2 col-content">{{ description }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Wartość:</div>
      <div class="col-2 col-content">{{ value }} {{ currency }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Waga:</div>
      <div class="col-2 col-content">{{ weight }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Spedytor:</div>
      <div class="col-2 col-content">{{ shipper }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Data nadania:</div>
      <div class="col-2 col-content">{{ createdDate }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Data płatności:</div>
      <div class="col-2 col-content">{{ paymentDate }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Komentarz:</div>
      <div class="col-2 col-content">{{ comment }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o załadunku</h4>
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Miejsce załadunku:</div>
      <div class="col-2 col-content">{{ loadingPlace }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">
        Najwcześniejsza data załadunku:
      </div>
      <div class="col-2 col-content">{{ minLoadingDate }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Najpóźniejsza data załadunku:</div>
      <div class="col-2 col-content">{{ maxLoadingDate }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Miejsce rozładunku:</div>
      <div class="col-2 col-content">{{ unloadingPlace }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">
        Najwcześniejsza data rozładunku:
      </div>
      <div class="col-2 col-content">{{ minUnloadingDate }}</div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Najpóźniejsza data rozładunku:</div>
      <div class="col-2 col-content">{{ maxUnloadingDate }}</div>
    </div>

    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o kierowcach</h4>
      </div>
    </div>
    <div
      class="row row-top-margin"
      v-for="(driver, index) in selectedOrder.orderDrivers"
      :key="index"
    >
      <div class="col-2 offset-4 col-title">Imię:</div>
      <div class="col-2 col-content">
        {{ driver.name }}
      </div>
      <div class="col-2 offset-4 col-title">Nazwisko:</div>
      <div class="col-2 col-content">
        {{ driver.surname }}
      </div>
      <div class="col-2 offset-4 col-title">Telefony kontaktowe:</div>
      <div class="col-2 col-content">
        <p> 
          {{ driver.firstPhoneNumber }}
        </p>
        <p v-if="driver.secondPhoneNumber != null">
          {{ driver.secondPhoneNumber }}
        </p>
      </div>
      <div class="col-2 offset-4 col-title">Tablice rejestracyjne:</div>
      <div class="col-2 col-content">
        <p>
          {{ driver.firstPlate }}
        </p>
        <p v-if="driver.secondPlate != null">
          {{ driver.secondPlate }}
        </p>
      </div>
    </div>

    <div class="row row-top-margin row-bottom-margin">
      <div class="col-2 offset-5">
        <router-link :to="editOrder" v-if="!editMode"
          ><button class="btn btn-sm btn-outline-success" @click="switchMode">
            Edytuj
          </button></router-link
        >
        <div v-else></div>
      </div>
    </div>
  </div>

  <router-view v-else>
      <order-edit
      :id="id"
      :selectedOrder="selectedOrder"
      @clicked="switchMode">
      </order-edit>
  </router-view>
</template>

<script>
import NavMenu from "../nav/NavMenu.vue";
import OrderEdit from './OrderEdit.vue';

export default {
  components: {
    NavMenu,
    OrderEdit
  },
  props: ["id"],
  data() {
    return {
      selectedOrder: null,
      editMode: false,
    };
  },
  computed: {
    currentOrder() {
      if (this.$store.getters["orders/getOrder"] === null) {
        return this.selectedOrder;
      } else {
        return this.$store.getters["orders/getOrder"];
      }
    },
    orderNumber() {
      return this.currentOrder.orderNumber;
    },
    givenBy() {
      return this.currentOrder.givenBy.companyName;
    },
    receivedBy() {
      return this.currentOrder.receivedBy.companyName;
    },
    description() {
      return this.currentOrder.description;
    },
    value() {
      return this.currentOrder.value;
    },
    currency() {
      return this.currentOrder.currency;
    },
    weight() {
      return this.currentOrder.weight;
    },
    shipper() {
      return this.currentOrder.shipper;
    },
    createdDate() {
      return this.currentOrder.createdDate;
    },
    paymentDate() {
      return this.currentOrder.paymentDate;
    },
    comment() {
      return this.currentOrder.comment;
    },
    loadingPlace() {
      return this.currentOrder.loadingInformation.loadingPlace;
    },
    minLoadingDate() {
      return this.currentOrder.loadingInformation.minLoadingDate;
    },
    maxLoadingDate() {
      return this.currentOrder.loadingInformation.maxLoadingDate;
    },
    unloadingPlace() {
      return this.currentOrder.loadingInformation.unloadingPlace;
    },
    minUnloadingDate() {
      return this.currentOrder.loadingInformation.minUnloadingDate;
    },
    maxUnloadingDate() {
      return this.currentOrder.loadingInformation.maxUnloadingDate;
    },
    editOrder() {
      return this.$route.path + "/edit";
    },
    isEditMode() {
        return this.editMode;
    }
  },
  methods: {
    switchMode() {
      this.editMode = !this.editMode;
    }
  },
  created() {
    this.selectedOrder = this.$store.getters[
      "orders/getAllOrders"].find(
      (order) => order.id === parseInt(this.id));
    console.log(this.selectedOrder);
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
}

.btn {
  margin-left: 5%;
}

h4 {
  font-weight: bold;
  margin-top: 1rem;
}
</style>
