import { asyncRoutes, constantRoutes } from '@/router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    route.meta.roles.some(role => {
      return roles.includes(role);
    });
  } else {
    return true;
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tem = { ...route };
    if (hasPermission(roles, tem)) {
      if (tem.children) {
        tem.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tem);
    }
  });
  console.log('res', res);
  return res;
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    }
  },
  actions: {
    generateRouter({ commit }, roles) {
      return new Promise((resolve, reject) => {
        let accessedRoutes;
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || [];
        } else {  
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
};

export default permission;
