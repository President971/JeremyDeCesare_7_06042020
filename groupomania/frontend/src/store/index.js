import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

export default new Vuex.Store({
  state: {
    status: '',
    user: {
      username: 'Nc',
      userId: 'Nc',
      email: 'Nc',
      token: null,
      isAdmin: false
    },
    userInfos: {
      username: '',
      email: '',
      bio: '',
      attachment: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/users/login/', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/users/register/', userInfos)
          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      instance.get('/users/me/')
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function () {
        });
    },
    updateUserInfos: ({ commit }, updateUserInfos) => {
      instance.put('/users/me/', updateUserInfos).then(function () {
        commit('userInfos', updateUserInfos);
      })
    },
  }
})