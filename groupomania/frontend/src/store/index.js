import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');
const instance = axios.create ({
  baseURL: 'http://localhost:8080'
});

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {      
    createAccount: ({commit}, userInfos) => {
    commit;
    instance.post('/users/register/', userInfos)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
},
  modules: {
  }
})
