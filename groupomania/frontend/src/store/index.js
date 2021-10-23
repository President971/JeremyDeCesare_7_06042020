import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
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
    messageId: '',
    status: '',
    user: user,
    userInfos: {
      username: '',
      email: '',
      avatar: '',
    },
    editOption: ""
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
      state.userInfos.username = userInfos.username;
      state.userInfos.email = userInfos.email;
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
      commit('setStatus');
      return new Promise((resolve, reject) => {
        instance.post('/user/login', userInfos)
          .then(function (response) {
            commit('setStatus');
            commit('logUser', response.data);
            commit('userInfos',response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/user/signup', userInfos)
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
      instance.get('/user/me/')
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function () {
        });
    },
    updateUserInfos: ({ commit }, updateUserInfos) => {
      instance.put('/user/me/', updateUserInfos).then(function () {
        commit('userInfos', updateUserInfos);
      })
    },
  }
})