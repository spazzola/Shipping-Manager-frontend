import { createStore } from 'vuex';

import companiesModule from './modules/companies/index.js';

let timer;

export default createStore({
  modules: {
    companies: companiesModule
  },
  state: {
    jwt: null,
    login: null,
    role: null
  },
  mutations: {
    setUser(state, payload) {
      state.jwt = payload.jwt;
      state.login = payload.login;
      state.role = payload.role;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      });
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
      'http://localhost:8080/user/authenticate';

      if (mode === 'signup') {
        url =
          'http://localhost:8080/user/register';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: payload.login,
            password: payload.password,

        })
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to authenticate. Check your login data.'
        );
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      // const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('jwt', responseData.jwt);
      localStorage.setItem('login', responseData.login);
      localStorage.setItem('role', responseData.role);
      localStorage.setItem('tokenExpiration', expirationDate);
      
      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        jwt: responseData.jwt,
        login: responseData.login,
        role: responseData.role
      });
    },
    tryLogin(context) {
      const jwt = localStorage.getItem('jwt');
      const login = localStorage.getItem('login');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      if (jwt && login) {
        context.commit('setUser', {
          jwt: jwt,
          login: login
        });
      }
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      context.commit('setUser', {
        jwt: null,
        login: null,
        role: null
      });
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    }
  }
})