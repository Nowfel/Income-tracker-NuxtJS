<template>
  <div style="max-width: 600px" class="m-auto">
    <form @submit.prevent="editMode ? update() : submit()">
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
      <div></div>
      <div></div>
      <input type="date" placeholder="Income Date..." v-model="date" />
      <input type="submit" :value="editMode ? 'UPDATE' : 'SUBMIT'" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      description: "",
      amount: "",
      isOfficeIncome: true,
      typeId: "",
      loader: false,
      selected: null,
      options: [{ value: null, text: "Please select an option" }],
      editMode: false,
    };
  },
  props: {
    editItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    incomeData() {
      return {
        description: this.description,
        date: this.date,
        amount: this.amount,
        typeId: this.typeId,
        isOfficeIncomeId: this.isOfficeIncome,
      };
    },
  },
  watch: {
    editItem: {
      immediate: true,
      deep: true,
      handler() {
        if (this.editItem && Object.keys(this.editItem).length){
          this.handleUpdateData(this.editItem);
        }else{
          this.editMode = false;
        }
        
      },
    },
  },
  mounted() {
    this.getAllType();
  },
  methods: {
    submit() {
      this.loader = true;
      this.$axios
        .post("income", this.incomeData)
        .then((result) => {
          this.$router.push("/income/list");
        })
        .catch((err) => {})
        .finally(() => {
          this.loader = false;
          this.$emit("close");
        });
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
    update() {
      this.loader = true;
      this.$axios
        .put("income/" + this.editItem.id, this.incomeData)
        .then((result) => {})
        .catch((err) => {})
        .finally(() => {
          this.loader = false;
          this.$emit("close");
        });
    },
    handleUpdateData({ amount, isOfficeIncome, typeId, date, description }) {
        this.editMode = true;
        this.amount = amount || "";
        this.description = description || "";
        this.date = date ? date.substr(0, 10) : "";
        this.typeId = typeId || null;
        this.isOfficeIncome = isOfficeIncome;
        // this.formData.desc = desc;
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