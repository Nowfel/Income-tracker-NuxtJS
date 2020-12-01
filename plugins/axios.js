export default function ({ app, store, $axios }) {
    $axios.interceptors.request.use(function (config) {
      if (store.getters["user/token"]) {
        config.headers.Authorization = `Bearer ${store.getters["user/token"]}`;
      }
      return config;
    });
  }