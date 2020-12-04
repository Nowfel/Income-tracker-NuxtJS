<template>
  <div>
    <span v-if="formattedItems && formattedItems.length">
      <b-table hover :fields="fields" :items="formattedItems">
        <template #cell(action)="data">
          <!-- <pre>
            {{data}}
          </pre> -->
          <button @click="handleDelete(data)">x</button>
          <b-button
            @click="
              () => {
                show = true;
                editItem = data.item;
              }
            "
            >Edit</b-button
          >
        </template>
      </b-table>
    </span>
    <span v-else>No data available</span>
    <div>
      <b-modal hide-footer v-model="show" title="BootstrapVue">
        <IncomeForm @close="()=> {
          show = false;
          getData();
          }" :editItem="editItem" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import IncomeForm from "@/components/IncomeForm";
export default {
  components: {
    IncomeForm,
  },
  data() {
    return {
      items: [],
      editItem: {},
      fields: [
        { key: "id", label: "Id" },
        { key: "date", label: "date" },
        { key: "type", label: "type" },
        { key: "amount", label: "amount" },
        { key: "description", label: "description" },
        "action",
      ],
      show: false,
    };
  },
  computed: {
    formattedItems() {
      return this.items.map((item) => {
        return {
          id: item.id,
          date: item.date,
          type: item.type ? item.type.title : "",
          typeId: item.type ? item.type.id : null,
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