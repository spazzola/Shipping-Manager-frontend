<template>
  <button
    :class="buttonClass"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
    props: ["buttonType", "buttonText"],
    computed: {
        buttonClass() {
            if (this.buttonType === 'confirm') {
                return "btn btn-sm btn-outline-success";
            }
            if (this.buttonType === 'reject') {
                return "btn btn-sm btn-outline-danger";
            }
            return "btn btn-sm";
        }
    }
}
</script>

<style scoped>
button {
    margin: 0.5rem;
}

.btn-outline-success {
  border-color: rgb(7, 150, 7);
  color: green;
}

.btn-outline-success:hover {
  background-color: rgb(7, 156, 7);
  color: #f6f7d7;
  border-color: rgb(7, 150, 7);
}
</style>