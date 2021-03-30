<template>
  <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-warning active btn-sm active">
      <input
        type="radio"
        name="options"
        id="option1"
        autocomplete="off"
        checked
        @click="changeStatusToTrue"
      />
      {{ leftSide }}
    </label>
    <label class="btn btn-warning btn-sm">
      <input
        type="radio"
        name="options"
        id="option2"
        autocomplete="off"
        @click="changeStatusToFalse"
      />
      {{ rightSide }}
    </label>
  </div>
</template>

<script>
export default {
  props: ["leftSide", "rightSide"],
  data() {
    return {
      status: true,
    };
  },
  methods: {
    changeStatusToTrue() {
      this.status = true;
      this.$emit("changeStatus", this.status);
    },
    changeStatusToFalse() {
      this.status = false;
      this.$emit("changeStatus", this.status);
    },
  },
};
</script>

<style scoped>
.btn-group {
  width: 20rem;
}

.btn-warning:not(:disabled):not(.disabled).active {
  background-color: #ff9a00;
  color: black;
}

.btn-warning {
  background-color: rgb(182, 179, 179);
  color: rgb(65, 62, 62);
  border-color: grey;
}
</style>