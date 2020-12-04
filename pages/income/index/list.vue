<template>
  <div>
    <span v-if="formattedItems && formattedItems.length">
      <b-table hover :fields="fields" :items="formattedItems">
        <template #cell(action)="data">
          <button @click="handleDelete(data)">x</button>
        </template>
      </b-table>
    </span>
    <span v-else>No data available</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        { key: "id", label: "Id" },
        { key: "date", label: "date" },
        { key: "type", label: "type" },
        { key: "amount", label: "amount" },
        { key: "description", label: "description" },
        "action",
      ],
    };
  },
  computed: {
    formattedItems() {
      return this.items.map((item) => {
        return {
          id: item.id,
          date: item.date,
          type: item.type ? item.type.title : "",
          amount: item.amount,
          description: item.description,
        };
      });
    },
    query() {
      return "?include=income.type&per_page=30&order_direction=desc";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("income" + this.query)
        .then((result) => {
          this.items = result.data.data;
        })
        .catch((err) => {});
    },
    handleDelete(data) {
      this.items = this.items.filter((item) => item.id !== data.item.id);
      this.$axios.delete("income/" + data.item.id);
    },
  },
};
</script>