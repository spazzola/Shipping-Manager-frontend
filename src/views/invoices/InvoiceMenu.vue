<template>
  <div class="row">
    <div class="col-xl-1 col-lg-2 bg" v-if="isAddMode">
      <router-link to="/invoices">
        <i class="fas fa-arrow-left"></i>Wstecz
      </router-link>
    </div>

    <div v-else class="row" style="width: 100%; margin-top: 0;">
      <div class="col-xl-2 col-lg-2 bg" style="margin-left: -2rem">
        <router-link to="/addInvoice">
          <i class="fas fa-times rotate"></i>Dodaj fakturę
        </router-link>
      </div>

      <div class="col-xl-4 col-lg-3 bg select-by" style="text-align: center">
        <p>Wyszukaj po:</p>
        <select class="form-select" @change="changeSelectBy($event)">
          <option value="none" selected>Wybierz</option>
          <option value="companyName">Nazwa firmy</option>
          <option value="nip">NIP</option>
        </select>
        <input
          class="form-control form-control-sm"
          :disabled="status.selectBy.by === 'none'"
          :placeholder="selectByPlaceHolder"
          v-model.trim="status.selectBy.value"
        />
      </div>

      <div class="col-xl-2" style="text-align: left">
        <select
          class="form-select"
          id="month"
          v-model="status.date.month"
          @change="changeMonth($event)"
        >
          <option value="1">Styczeń</option>
          <option value="2">Luty</option>
          <option value="3">Marzec</option>
          <option value="4">Kwiecień</option>
          <option value="5">Maj</option>
          <option value="6">Czerwiec</option>
          <option value="7">Lipiec</option>
          <option value="8">Sierpień</option>
          <option value="9">Wrzesien</option>
          <option value="10">Październik</option>
          <option value="11">Listopad</option>
          <option value="12">Grudzień</option>
        </select>
        <select
          style="margin-left: 0.5rem"
          class="form-select"
          id="year"
          v-model="status.date.year"
          @change="changeYear($event)"
          :selected:="year"
        >
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isAddMode"],
  data() {
    return {
      status: {
        selectBy: {
          by: "none",
          value: null,
        },
        date: {
          day: 1,
          month: this.getMonth(),
          year: this.getYear(),
        },
      },
      typedProperty: null,
    };
  },
  computed: {
    selectByPlaceHolder() {
      if (this.status.selectBy.by === "companyName") {
        return "Nazwa firmy";
      }
      if (this.status.selectBy.by === "nip") {
        return "NIP";
      } else {
        return "";
      }
    },
  },
  methods: {
    changeSelectBy(value) {
      this.status.selectBy.by = value.target.value;
    },
    getDate() {
      let currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");

      return currentDateWithFormat;
    },
    getMonth() {
      let currentDate = this.getDate();
      let monthStr = currentDate.slice(5, 7);
      if (monthStr.charAt(0) === "0") {
        return monthStr.slice(1, 2);
      } else {
        return monthStr;
      }
    },
    getYear() {
      let currentDate = this.getDate();
      return currentDate.slice(0, 4);
    },
    changeMonth(event) {
      this.status.date.month = event.target.value;
      this.$emit("sortByDate", this.status);
    },
    changeYear(event) {
      this.status.date.year = event.target.value;
      this.$emit("sortByDate", this.status);
    },
  },
  updated() {
    if (this.status.selectBy.value !== null) {
      this.$emit("sortByProperty", this.status);
    }
  },
  created() {
    this.$emit("sortByDate", this.status);
  }
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
  margin-top: -0.2rem;
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

.select-by {
  text-align: left;
  padding: 0 !important;
}

input {
  width: 30%;
  display: inline;
  margin-left: 1rem;
}

.form-select {
  height: 100%;
  border-radius: 5px;
}

p {
  display: inline-block;
  margin: 0 1rem 0 0;
  font-weight: bold;
}
</style>