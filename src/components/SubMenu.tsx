import { FC, memo } from 'react';
import { history } from 'umi';
import styles from './subMenu.less';

const SubMenu: FC<any> = ({ children, title, pathname }) => {
  return (
    <div className={styles.submenu}>
      <p className={styles.name}>{title}</p>
      <ul>
        {children.map((item, i) => (
          <li
            key={i}
            className={item.pathname === pathname ? styles.active : ''}
            onClick={() => history.push({ pathname: item.pathname })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SubMenu);
