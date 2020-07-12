// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [{
    path: '/',
    component: '../layouts/index',
    routes: [{
        path: '/',
        // exact: true,
        component: '../pages/index'
      },
      {
        path: '/form',
        exact: true,
        title: "form",
        component: '../pages/Form'
      }
    ]
  }],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
