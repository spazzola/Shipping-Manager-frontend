<template>
  <div class="row">
    <div class="col-xl-1 col-lg-2 bg">
      <router-link to="/addOrder">
        <i class="fas fa-times rotate"></i>Dodaj zamówienie
      </router-link>
    </div>
    <div class="col-xl-1 col-lg-2 bg" v-if="isAddMode">
      <router-link to="/companies">
        <i class="fas fa-arrow-left"></i>Wstecz
      </router-link>
    </div>
    <div class="col-xl-2 col-lg-2 bg">
      <base-toggle
        @changeStatus="changeToMyOrAllOrders"
        leftSide="Wszystkie zlecenia"
        rightSide="Moje zlecenia"
      ></base-toggle>
    </div>
    <div class="col-xl-2 col-lg-2 bg">
      <base-toggle
        @changeStatus="changeToGivenOrReceivedOrders"
        leftSide="Wydane zlenia"
        rightSide="Otrzymane zlecenia"
      ></base-toggle>
    </div>
  </div>
</template>

<script>
import BaseToggle from "../ui/BaseToggle.vue";

export default {
  components: {
    BaseToggle,
  },
  data() {
    return {
      status: {
        showAllOrders: true,
        showGivenOrders: true
      }
    };
  },
  methods: {
    changeToMyOrAllOrders(value) {
      this.status.showAllOrders = value;
      this.$emit("changeToMyOrAllOrders", this.status);
    },
    changeToGivenOrReceivedOrders(value) {
      this.status.showGivenOrders = value;
      this.$emit("changeToGivenOrReceivedOrders", this.status);
    }
  },
};
</script>

<style scoped>
.row {
  margin-top: 0.5rem;
  font-size: 1rem;
}

a {
  color: #ff9a00 !important;
  display: block;
  width: 100%;
  margin-top: 0.2rem;
}

a:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
  max-width: 100%;
  text-decoration: none !important;
}

.col-1 {
  padding: 0;
}

.col-1:hover {
  background-color: #ff9a00;
  color: #f6f7d7 !important;
}

.col:hover {
  background-color: red;
}

.col-lg-2 {
  padding: 0 !important;
}

i {
  color: green;
  margin-right: 5%;
}

.rotate {
  transform: rotate(45deg);
}
</style>