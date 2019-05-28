import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // getToken from cookie

NProgress.configure({ showSpinner: false }); // NProgress configuration

const whiteList = ['/login', '/dashboard']; // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (getToken()) {
    console.log('有Token');
    console.log('store.getters.roles', store.getters.roles);
    if (store.getters.roles && store.getters.roles.length > 0) {
      console.log('有roles');
      next();
    } else {
      console.log('无roles');
      try {
        // 根据Token获取用户信息
        const roles  = await store.dispatch('getInfo');
        console.log('roles', roles);
        // 根据角色（或者权限）获取能访问的路由
        const accessRoutes = await store.dispatch('generateRouter', roles);
        console.log('accessRouter', accessRoutes);
        router.options.routes.push( ...accessRoutes );
        router.addRoutes(accessRoutes);
        console.log('router', router);
        next({ ...to, replace: true });
      } catch (error) {
        await store.dispatch('resetToken');
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  } else {
    console.log('无Token');
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
