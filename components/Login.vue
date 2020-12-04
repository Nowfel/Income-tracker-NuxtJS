<template>
  <form @submit.prevent="submit">
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Email"
      label-for="input-sm"
    >
      <b-form-input id="input-sm" size="sm" v-model="email"></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Password"
      label-for="input-sm"
    >
      <b-form-input
        id="input-sm"
        size="sm"
        v-model="password"
        type="password"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label-for="input-sm"
    >
      <b-overlay
        :show="busy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
      >
        <b-button block :disabled="busy" variant="primary" type="submit">
          Login
        </b-button>
      </b-overlay>
    </b-form-group>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "m@r.com",
      password: "123456",
      busy: false,
    };
  },
  methods: {
    submit() {
      let object = {
        email: this.email,
        password: this.password,
      };
      this.busy = true;
      this.$axios
        .post("login", object)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          this.$router.push("/income/list");
        })
        .catch((err) => {})
        .finally(() => (this.busy = false));
    },
  },
};
</script>

<style scoped>
</style>