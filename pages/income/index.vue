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
          description: item.description,
          amount: item.amount,
        };
      });
    },
    
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("income")
        .then((result) => {
          this.items = result.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>