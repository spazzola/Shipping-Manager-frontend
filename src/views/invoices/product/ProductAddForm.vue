<template>
  <div
    class="row row-top-margin"
    v-for="index in productsToAdd"
    :key="index.value"
  >
    <div class="col-2 offset-4 col-title">Nazwa usługi:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="products[index - 1].productName"
        placeholder="Nazwa usługi"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Jednostka miary:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="products[index - 1].measureUnit"
        placeholder="Jednostka miary"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Ilość:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        v-model="products[index - 1].quantity"
        placeholder="Ilość"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Cena jednostkowa bez VAT:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        v-model="products[index - 1].priceWithoutTax"
        placeholder="Cena jednostkowa bez VAT"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Wartość podatku (%):</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        v-model="products[index - 1].tax"
        placeholder="Wartość podatku (%)"
        :key="index"
      />
    </div>
    <div class="col-2 offset-6" style="text-align: center">
      <button
        class="btn btn-sm btn-remove remove"
        @click.stop.prevent="removeProductField(index - 1)"
      >
        <i class="fas fa-times remove"></i>
      </button>
    </div>
  </div>

  <div class="row">
    <div class="col-2 offset-6" style="text-align: center">
      <button class="btn btn-sm btn-remove" @click.stop.prevent="addNewProduct">
        <i class="fas fa-times rotate"></i> Dodaj usługę
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["new-products"],
  data() {
    return {
      productsToAdd: 1,
      products: [
        {
          productName: null,
          measureUnit: null,
          priceWithoutTax: null,
          quantity: null,
          tax: null,
          taxValue: null,
        },
      ],
    };
  },
  methods: {
    removeProductField(index) {
      if (this.productsToAdd > 1) {
        this.productsToAdd -= 1;
        this.products.splice(index, 1);
      }
    },
    async addNewProduct() {
      this.products.push({
        productName: null,
        measureUnit: null,
        priceWithoutTax: null,
        quantity: null,
        tax: null,
        taxValue: null,
      });
      this.productsToAdd += 1;
    },
  },
  updated() {
    this.$emit("new-products", this.products);
  },
};
</script>

<style scoped>
.row {
  margin-top: 1rem;
}

.col-title {
  text-align: right;
  font-weight: bold;
}

.col-content {
  text-align: left !important;
}

.remove {
  color: red !important;
  display: inline;
}

.btn-remove {
  color: green !important;
}

.rotate {
  transform: rotate(45deg);
}
</style>