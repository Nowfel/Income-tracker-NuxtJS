const path = "income";
const typePath = "income-type";
export default {
  saveData({ commit }, payload) {
    return this.$axios.post(path, payload).then(response => {
      commit("saveData", response.data.data);
      return response;
    });
  },
  getData({ commit }, payload) {
    return this.$axios.get(path + payload).then(response => {
      commit("getData", response.data.data);
      return response;
    });
  },
  deleteData({ commit }, payload) {
    return this.$axios.delete(path + "/" + payload).then(response => {
      commit("deleteData", payload);
      return response;
    });
  },
  editData({ commit }, payload) {
    return this.$axios
      .put(path + "/" + payload.id, payload)
      .then(response => {
        commit("editData", payload);
        return response;
      });
  },
  getType({ commit }, payload) {
    return this.$axios.get(typePath + payload).then(response => {
      commit("getType", response.data.data);
      return response;
    });
  },
  saveType({ commit }, payload) {
    return this.$axios.post(typePath, payload).then(response => {
      return response;
    });
  },
  editType({ commit }, payload) {
    return this.$axios
      .put(typePath + "/" + payload.id, payload.data)
      .then(response => {
        return response;
      });
  },
  deleteType({ commit }, payload) {
    return this.$axios.delete(typePath + "/" + payload.id).then(response => {
      return response;
    });
  },
  setTypeData({ commit }, payload) {
    commit("setTypeData", payload);
  },
  getSingleData({ commit }, payload) {
    return this.$axios.get(path + payload).then(response => {
      commit("getSingleData", response.data.data);
      return response;
    });
  }
};
