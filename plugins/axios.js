export default function ({ app, store, $axios }) {
    $axios.interceptors.request.use(function (config) {
        let token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }