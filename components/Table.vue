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
          id: 1,
          name: item.name,
          username: item.username,
          email: item.email,
          address: item.address ? item.address.city : "",
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
        .get("users")
        .then((result) => {
          this.items = result.data;
          console.log("get data", result.data);
        })
        .catch((err) => {});
    },
  },
};
</script>