<template>
  <div class="container">
    <Caro />
    <Table />
    <Shipping />
  </div>
</template>

<script>
import Caro from "../components/Caro";
import Table from "../components/Table";
import Shipping from "../components/Shipping";
export default {
  components: {
    Caro,
    Table,
    Shipping,
  },
};
</script>
<style>
</style>