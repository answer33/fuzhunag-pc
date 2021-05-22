import { FC, memo } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { logout } from '@/pages/login/services';
import { cleanToken } from '@/utils/token';
import { history, useSelector } from 'umi';
import styles from './header.less';

const onLogout = () => {
  logout().then((res) => {
    cleanToken();
    history.push('/login');
  });
};

const menu = (
  <Menu>
    <Menu.Item>
      <p onClick={onLogout}>退出登录</p>
    </Menu.Item>
  </Menu>
);

const User: FC<any> = ({ name }) => {
  const { userInfo } = useSelector(({ global }) => ({
    userInfo: global.userInfo,
  }));
  return (
    <div className={styles.header}>
      <div className={styles.left}>{name}</div>
      <div className={styles.right}>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            {userInfo.username || 'admin'} <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default memo(User);
