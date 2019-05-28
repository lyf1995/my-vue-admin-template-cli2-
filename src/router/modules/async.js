import Layout from '@/views/layout/Layout';
 
const asyncRouter = {
  path: '/async',
  name: 'async',
  meta: {
    title: '异步路由一',
    roles: ['admin', 'user']
  },
  component: Layout,
  children: [
    {
      path: 'one',
      name: 'asyncOne',
      meta: {
        title: '异步路由一',
        roles: ['admin']
      }
    },
    {
      path: 'two',
      name: 'asyncTwo',
      meta: {
        title: '异步路由二',
        roles: ['admin', 'user']
      }
    }
  ]
};
export default asyncRouter;