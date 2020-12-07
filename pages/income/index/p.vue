<template>
  <div style="max-width: 600px" class="m-auto">
    <form @submit.prevent="submit">
      <div>
        <input
          type="text"
          placeholder="Income Description..."
          v-model="description"
        />
      </div>
      <div>
        <b-form-select v-model="typeId" :options="options"></b-form-select>
        {{ selected }}
      </div>
      <div>
        <input type="number" placeholder="Income Value..." v-model="amount" />
      </div>
      <input type="date" placeholder="Income Date..." v-model="date" />
      <input type="submit" :value="editMode ? 'UPDATE' : 'SUBMIT'" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      typeId: "",
      amount: "",
      date: "",
      editMode: false,
      selected: null,
      options: [{ value: null, text: "Please select an option" }],
    };
  },
  computed: {
    stateData() {
      return {
        description: this.description,
        typeId: this.typeId,
        amount: this.amount,
        date: this.date,
      };
    },
  },
  created() {
    this.p();
  },
  methods: {
    submit() {
      console.log(this.stateData);
    },
    p() {
      this.$axios
        .get("income-type")
        .then((result) => {
          let items = result.data.data.map((item) => {
            return {
              value: item.id,
              text: item.title,
            };
            console.log(items);
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
  flex-direction: column;
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