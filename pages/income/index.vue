<template>
  <div>
    <b-table hover :items="formattedItems"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  computed: {
    formattedItems() {
      return this.items.map((item) => {
        return {
          id: item.id,
          date: item.date,
          type: item.type ? item.type.title : '',
          amount: item.amount,
        };
      });
    },
    query(){
        return "?include=income.type&per_page=5&order_direction=asc"
    }

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
  },
};
</script>