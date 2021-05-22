import { memo, FC, ReactNode } from 'react';
import routes from '@/config/roures';
import { useSelector, useDispatch } from 'dva';
import { GlobalModelState, history, useRequest } from 'umi';
import { Layout, Menu } from 'antd';
import Header from '@/components/Header';
import SubMenu from '@/components/SubMenu';
import { getUserPermissionByToken } from '@/services';
import styles from './index.less';

const { Content, Sider } = Layout;

const MenuIcon: FC<{ index: number }> = ({ index }) => {
  return (
    <img
      src={require(`@/assets/img/menu${index + 1}.png`)}
      alt=""
      style={{ width: 28 }}
    />
  );
};

interface propsType {
  children: ReactNode;
}
const BasicLayout: FC<propsType> = ({ children }) => {
  const pathname = history.location.pathname;
  const { subMenu, submenuTitle } = useSelector(
    ({ global }: { global: GlobalModelState }) => ({
      subMenu: global.subMenu,
      submenuTitle: global.submenuTitle,
    }),
  );
  const getKey = () => {
    const index = routes.findIndex((item) => pathname.includes(item.pathname));
    if (index !== -1) {
      return routes[index].pathname;
    } else {
      return '';
    }
  };
  const { data } = useRequest(getUserPermissionByToken);
  console.log(111, data);
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className={styles['menu-logo']} onClick={() => history.push('/')}>
          <img src={require('@/assets/img/menu-logo.png')} alt="" />
        </div>
        <Menu theme="dark" mode="vertical" selectedKeys={[getKey()]}>
          {routes.map((item, i) => (
            <Menu.Item
              key={item.pathname}
              icon={<MenuIcon index={i} />}
              onClick={() => history.push(item.pathname)}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: !subMenu?.length ? 200 : 340 }}>
        <Header />
        <Content
          style={{
            display: 'flex',
            minHeight: '100vh',
          }}
        >
          {subMenu?.length ? (
            <SubMenu
              children={subMenu}
              title={submenuTitle}
              pathname={pathname}
            />
          ) : (
            ''
          )}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(BasicLayout);
