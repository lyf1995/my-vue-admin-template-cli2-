import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    account: {},
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        if(userInfo.username === 'admin') {
          setToken('admin');
          commit('SET_TOKEN', 'admin');
        } else {
          setToken('user');
          commit('SET_TOKEN', 'user');
        }
       
        // console.log('getToken', getToken())
        resolve();
        // login(username, userInfo.password)
        //   .then(response => {
        //     const data = response.data;
        //     setToken(data.token);
        //     commit('SET_TOKEN', data.token);
        //     resolve();
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
      });
    },

    // 获取用户信息
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        let roles = [];
        if(state.token === 'admin') {
          roles = ['admin', 'user'];
        } else {
          roles = ['user'];
        }
        commit('SET_ROLES', roles);
        // console.log('roles', roles);
        resolve(roles);
        // getInfo(state.token)
        //   .then(response => {
        //     const data = response.data;
        //     if (data.roles && data.roles.length > 0) {
        //       // 验证返回的roles是否是一个非空数组
        //       commit('SET_ROLES', data.roles);
        //     } else {
        //       reject('getInfo: roles must be a non-null array !');
        //     }
        //     resolve(response);
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
      });
    },

    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ACCOUNT', {});
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
