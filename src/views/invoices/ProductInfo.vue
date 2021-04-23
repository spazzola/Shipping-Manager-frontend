<template>
  <div v-for="(product, index) in products" :key="index" class="row top-margin">
    <div class="col-2 offset-5 col-title">
      <p>Nazwa usługi:</p>
      {{ product.productName }}
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Ilość:</p>
      {{ product.quantity }}
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Jednostka:</p>
      {{ product.measureUnit }}
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Cena jednostkowa bez VAT:</p>
      {{ product.priceWithoutTax }} {{ toUpperCase(currency) }}
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Wartość podatku:</p>
      {{ product.taxValue * 100 }}%
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Wartość netto:</p>
      {{ product.valueWithoutTax }} {{ toUpperCase(currency) }}
    </div>
    <div class="col-2 offset-5 col-title">
      <p>Wartość brutto:</p>
      {{ product.valueWithTax }} {{ toUpperCase(currency) }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["products", "currency"],
  methods: {
      toUpperCase(value) {
          return value.toUpperCase();
      }
  }
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

.top-margin {
    margin-top: 1%;
}
</style>