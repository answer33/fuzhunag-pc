import { FC, memo } from 'react';
import { Checkbox } from 'antd';
import styles from './index.less';

const Payment: FC<any> = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className={styles.payment}>
      <p className={styles.title}>设置支付方式</p>
      <div className={styles.list}>
        <div className={styles.item}>
          <Checkbox onChange={onChange}></Checkbox>
          <img
            src={require('@/assets/img/settings/zfb.png')}
            alt=""
            style={{ width: 28 }}
          />
          <div>
            <p>支付宝支付</p>
            <p>支付宝 快捷支付</p>
          </div>
        </div>
        <div className={styles.item}>
          <Checkbox onChange={onChange}></Checkbox>
          <img
            src={require('@/assets/img/settings/wechat.png')}
            alt=""
            style={{ width: 29 }}
          />
          <div>
            <p>微信支付</p>
            <p>微信 快捷支付</p>
          </div>
        </div>
        <div className={styles.item}>
          <Checkbox onChange={onChange}></Checkbox>
          <img
            src={require('@/assets/img/settings/bank.png')}
            alt=""
            style={{ width: 29 }}
          />
          <div>
            <p>银行转账</p>
            <p>支持银行：中国银行/农业银行/交通银行/工商银行</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Payment);
