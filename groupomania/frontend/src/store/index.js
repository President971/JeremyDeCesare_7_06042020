import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export default new Vuex.Store({
  state: {
    status: '',
    user: {
      userid: -1,
      token: '',
    },
  },
  mutations: {
    setStatus:  function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      state.user = user;
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/users/login/', userInfos)
          .then(function (response) {
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login')
            reject(error);
          });
      })
    },
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading');
        instance.post('/users/register/', userInfos)
          .then(function (res) {
            commit('setStatus', 'created')
            resolve(res);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create')
            reject(error);
          });
      })
    }
  },
  modules: {
  }
})
