const routes = [
  {
    name: '概况',
    pathname: '/dashboard',
  },
  {
    name: '订单管理',
    pathname: '/order_management',
    submenuTitle: '订单管理',
    childrens: [
      {
        name: '新订单',
        pathname: '/order_management/new_order',
      },
      {
        name: '打样订单',
        pathname: '/order_management/proof_order',
      },
      {
        name: '定制订单',
        pathname: '/order_management/custom_order',
      },
    ],
  },
  {
    name: '会员管理',
    pathname: '/member_management',
    submenuTitle: '会员管理',
    childrens: [
      {
        name: '会员列表',
        pathname: '/member_management/member_list',
      },
      {
        name: '会员日志',
        pathname: '/member_management/member_log',
      },
    ],
  },
  {
    name: '工厂管理',
    pathname: '/factory_management',
    submenuTitle: '工厂管理',
    childrens: [
      {
        name: '工厂列表',
        pathname: '/factory_management/factory_list',
      },
      {
        name: '工厂日志',
        pathname: '/factory_management/factory_log',
      },
    ],
  },
  {
    name: '财务',
    pathname: '/finance',
    submenuTitle: '财务管理',
    childrens: [
      {
        name: '资金管理',
        pathname: '/finance/funds_management',
      },
      {
        name: '对账中心',
        pathname: '/finance/reconciliation_center',
      },
      {
        name: '提现审批',
        pathname: '/finance/withdraw_approval',
      },
    ],
  },
  {
    name: '数据',
    pathname: '/data',
    submenuTitle: '数据分析',
    childrens: [
      {
        name: '经营数据',
        pathname: '/data/operating_data',
      },
      {
        name: '会员数据',
        pathname: '/data/member_data',
      },
      {
        name: '工厂数据',
        pathname: '/data/factory_data',
      },
      {
        name: '货品数据',
        pathname: '/data/goods_data',
      },
    ],
  },
  {
    name: '设置',
    pathname: '/settings',
    submenuTitle: '设置',
    childrens: [
      {
        name: '账号设置',
        pathname: '/settings/account',
      },
      {
        name: '密码设置',
        pathname: '/settings/psw',
      },
      {
        name: '用户管理',
        pathname: '/settings/member',
      },
      {
        name: '支付设置',
        pathname: '/settings/payment',
      },
    ],
  },
];

export default routes;
