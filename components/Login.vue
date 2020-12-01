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
      <b-button type="submit" block variant="primary">Login</b-button>
    </b-form-group>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "m@r.com",
      password: "123456",
    };
  },
  methods: {
    submit() {
      let object = {
        email: this.email,
        password: this.password,
      };
      this.$axios
        .post("login", object)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          console.log('fsfsf',result.data.token);
        })
        .catch((err) => {});
      console.log("submit");
    },
  },
};
</script>

<style scoped>
</style>