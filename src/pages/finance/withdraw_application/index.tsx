import { FC, memo } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

const WithdrawApplication: FC<any> = () => {
  return (
    <div className={styles['withdraw-application']}>
      <p className={styles.title}>提现申请</p>
      <div className={styles.info}>
        <div className={styles.price}>
          <img src={require('@/assets/img/finance/icon7.png')} alt="" />
          <p>
            申请提现金额<span>（元）</span>
          </p>
          <p>
            <span>¥ </span>
            5000
          </p>
        </div>
        <ul>
          <li>
            <span>申请时间：</span>
            2021-03-15 14:00:21
          </li>
          <li style={{ color: '#FF8149' }}>
            <span>工厂名称：</span>
            xxxxxxx公司
          </li>
          <li>
            <span>提现账号：</span>
            银行账户
          </li>
          <li>
            <span>开户行：</span>
            农业银行
          </li>
          <li>
            <span>卡号：</span>
            6224 7283 7266 271894
          </li>
          <li>
            <span>用户名：</span>
            李四
          </li>
        </ul>
      </div>
      <div className={styles.opinion}>
        <TextArea placeholder="填写意见" style={{ width: 404, height: 90 }} />
        <div className={styles.operate}>
          <Button type="primary">同意</Button>
          <Button style={{ marginLeft: 15 }}>驳回</Button>
        </div>
      </div>
    </div>
  );
};

export default memo(WithdrawApplication);
