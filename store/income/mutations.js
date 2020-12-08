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
  },
  saveData(state, data) {
    state.allData = [data,...state.allData];
  },
  deleteData(state, id) {
    state.allData= state.allData.filter((item) => item.id !== id);
    
  },
  editData(state, data) {
    state.allData= state.allData.map((item) => (item.id === data.id ? data : item));
    
  },
  
}