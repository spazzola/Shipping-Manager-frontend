<template>
  <form>
    <div class="row row-top-margin">
      <div class="col-2 offset-5 col-title">
        <h4>Informacje o załadunku</h4>
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Miejsce załadunku:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="loadingInformation.loadingPlace"
          :placeholder="loadingInfo.loadingPlace"
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
          v-model.trim="loadingInformation.minLoadingDate"
          :placeholder="loadingInfo.minLoadingDate"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Najpóźniejsza data załadunku:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="loadingInformation.maxLoadingDate"
          :placeholder="loadingInfo.maxLoadingDate"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Miejsce rozładunku:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="loadingInformation.unloadingPlace"
          :placeholder="loadingInfo.unloadingPlace"
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
          v-model.trim="loadingInformation.minUnloadingDate"
          :placeholder="loadingInfo.minUnloadingDate"
        />
      </div>
    </div>
    <div class="row row-top-margin">
      <div class="col-2 offset-4 col-title">Najpóźniejsza data rozładunku:</div>
      <div class="col-2 col-content">
        <input
          class="form-control form-control-sm"
          v-model.trim="loadingInformation.maxUnloadingDate"
          :placeholder="loadingInfo.maxUnloadingDate"
        />
      </div>
    </div>
    <div class="button-row">
      <button
        class="btn btn-sm btn-outline-danger additional-top-margin"
        @click.stop.prevent="goBack"
      >
        Cofnij
      </button>
      <button
        class="btn btn-sm btn-outline-success additional-top-margin"
        style="margin-left: 1rem"
        @click.stop.prevent="submitForm"
      >
        Dalej
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["loadingInfo"],
  data() {
    return {
      loadingInformation: {
        loadingPlace: null,
        minLoadingDate: null,
        maxLoadingDate: null,
        unloadingPlace: null,
        minUnloadingDate: null,
        maxUnloadingDate: null,
      },
    };
  },
  methods: {
    goBack() {
      this.$emit("go-back");
    },
    submitForm() {
      if (this.loadingInformation.loadingPlace === null) {
        this.loadingInformation.loadingPlace = this.loadingInfo.loadingPlace;
      }

      if (this.loadingInformation.minLoadingDate === null) {
        this.loadingInformation.minLoadingDate = this.loadingInfo.minLoadingDate;
      }

      if (this.loadingInformation.maxLoadingDate === null) {
        this.loadingInformation.maxLoadingDate = this.loadingInfo.maxLoadingDate;
      }

      if (this.loadingInformation.unloadingPlace === null) {
        this.loadingInformation.unloadingPlace = this.loadingInfo.unloadingPlace;
      }

      if (this.loadingInformation.minUnloadingDate === null) {
        this.loadingInformation.minUnloadingDate = this.loadingInfo.minUnloadingDate;
      }

      if (this.loadingInformation.maxUnloadingDate === null) {
        this.loadingInformation.maxUnloadingDate = this.loadingInfo.maxLoadingDate;
      }
      
      this.$emit("loading-info", this.loadingInformation);
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

.remove {
  color: red !important;
  display: inline;
}

.row {
  margin-top: 1rem;
}

.button-row {
  margin-top: 1.5rem !important;
}

.additional-top-margin {
  margin-top: 1rem;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}
</style>