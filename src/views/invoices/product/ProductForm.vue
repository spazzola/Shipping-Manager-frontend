<template>
  <div
    class="row row-top-margin"
    v-for="(product, index) in selectedInvoice.products"
    :key="index"
  >
    <div class="col-2 offset-4 col-title">Nazwa usługi</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="selectedInvoice.products[index].productName"
        :placeholder="isAddForm ? 'Nazwa usługi' : product.productName"
        :key="index"
      />
    </div>

    <div class="col-2 offset-4 col-title">Jednostka miary:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="selectedInvoice.products[index].measureUnit"
        :placeholder="isAddForm ? 'Jednostka miary' : product.measureUnit"
        :key="index"
      />
    </div>

    <div class="col-2 offset-4 col-title">Ilość:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        step="0.01"
        v-model="selectedInvoice.products[index].quantity"
        :placeholder="isAddForm ? 'Ilość' : product.quantity"
        :key="index"
      />
    </div>

    <div class="col-2 offset-4 col-title">Cena jednostkowa bez VAT:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        step="0.01"
        v-model="selectedInvoice.products[index].priceWithoutTax"
        :placeholder="
          isAddForm ? 'Cena jednostkowa bez VAT' : product.priceWithoutTax
        "
        :key="index"
      />
    </div>

    <div class="col-2 offset-4 col-title">Wartość podatku (%):</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="number"
        step="0.01"
        v-model="selectedInvoice.products[index].taxValue"
        :placeholder="isAddForm ? 'Wartość podatku %' : product.taxValue + '%'"
        :key="index"
      />
      <div class="col-1 offset-5">
        <button
          class="btn btn-sm btn-remove remove"
          style="text-align: center"
          @click.stop.prevent="deleteProduct(index)"
        >
          <i class="fas fa-times remove"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="row row-top-margin" v-for="index in productsToAdd" :key="index.value">
    <div class="col-2 offset-4 col-title">Nazwa usługi:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="newProducts[index - 1].productName"
        placeholder="Nazwa usługi"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Jednostka miary:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="newProducts[index - 1].measureUnit"
        placeholder="Jednostka miary"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Ilość:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="newProducts[index - 1].quantity"
        placeholder="Ilość"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Cena jednostkowa bez VAT:</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="newProducts[index - 1].priceWithoutTax"
        placeholder="Cena jednostkowa bez VAT"
        :key="index"
      />
    </div>
    <div class="col-2 offset-4 col-title">Wartość podatku (%):</div>
    <div class="col-2 col-content">
      <input
        class="form-control form-control-sm"
        type="text"
        v-model="newProducts[index - 1].taxValue"
        placeholder="Wartość podatku (%)"
        :key="index"
      />
    </div>
    <div class="col-2 offset-6" style="text-align: center;">
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
  props: ["products", "id", "isAddForm"],
  data() {
    return {
      newProducts: [],
      selectedInvoice: null,
      productsToAdd: 0,
      productsToDelete: [],
    };
  },
  methods: {
    async addNewProduct() {
      this.newProducts.push({
        productName: null,
        measureUnit: null,
        priceWithoutTax: null,
        quantity: null,
        tax: null,
        taxValue: null,
      });
      this.productsToAdd += 1;
    },
    removeProductField(index) {
      this.productsToAdd -= 1;
      this.newProducts.splice(index, 1);
    },
    deleteProduct(index) {
      this.productsToDelete.push(this.selectedInvoice.products[index]);
      if (index > -1) {
        this.selectedInvoice.products.splice(index, 1);
      }
    },
  },
  created() {
    if (this.$store.getters["invoices/getInvoice"] === null) {
      this.selectedInvoice = this.$store.getters[
        "invoices/getAllInvoices"
      ].find((invoice) => invoice.id === parseInt(this.id));
    } else {
      this.selectedInvoice = this.$store.getters["invoices/getInvoice"];
    }
  },
  updated() {
    if (this.newProducts.length > 0) {
      var resultProducts = this.selectedInvoice.products.concat(this.newProducts);
      this.$emit("products-data", resultProducts);
    } else {
      this.$emit("products-data", this.selectedInvoice.products);
    }
    this.$emit("products-to-delete", this.productsToDelete);
  },
};
</script>

<style scoped>
p {
  display: inline;
  font-weight: bold;
}

div {
  text-align: left;
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

.btn-remove {
  color: green !important;
}

.remove {
  color: red !important;
  display: inline;
}

.rotate {
  transform: rotate(45deg);
}
</style>