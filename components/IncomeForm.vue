<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      placeholder="Income Description..."
      v-model="description"
    />
    <div>
      <b-form-select v-model="selected" :options="options"></b-form-select>
      {{ selected }}
    </div>
    <input type="number" placeholder="Income Value..." v-model="amount" />
    <input type="date" placeholder="Income Date..." v-model="date" />
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      date: "",
      description: "",
      isOfficeIncome: true,
      typeId: null,
      loader: false,
      selected: null,
      options: [{ value: null, text: "Please select an option" }],
    };
  },
  mounted() {
    this.getAllType();
  },
  methods: {
    submit() {
      let object = {
        description: this.description,
        date: this.date,
        amount: this.amount,
        typeId: this.typeId,
        isOfficeIncomeId: this.isOfficeIncome,
      };
      this.loader = true;
      this.$axios
        .post("income", object)
        .then((result) => {
          this.$router.push("/income/list");
        })
        .catch((err) => {})
        .finally(() => (this.loader = false));
    },
    getAllType() {
      this.$axios
        .get("income-type")
        .then((result) => {
          let items = result.data.data.map((item) => {
            return {
              value: item.id,
              text: item.title,
            };
          });
          this.options = [...this.options, ...items];
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
form input {
  color: #888;
  border: none;
  outline: none;
  font-size: 20px;
}
form input::placeholder {
  color: #aaa;
}
form input:not([type="submit"]) {
  display: block;
  background: #fff;
  border: none;
  outline: none;
  padding: 5px 15px;
}
form input[type="submit"] {
  display: block;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 500;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  background-color: #ffce00;
  cursor: pointer;
}
form input:first-of-type {
  border-radius: 8px 0px 0px 8px;
}
form input:last-of-type {
  border-radius: 0px 8px 8px 0px;
}
</style>