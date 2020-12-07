export default {
  getData(state, data) {
    state.allData = data;
  },
  getType(state, data) {
    state.allType = data;
  },
  setTypeData(state, data) {
    state.allType = [data, ...state.allType]
  },
  getSingleData(state, data) {
    state.singleData = data
  }
}