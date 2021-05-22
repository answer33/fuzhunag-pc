import { FC, memo } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { history } from 'umi';
import { setToken } from '@/utils/token';
import styles from './user.less';

const phoneReg = /^[1][0-9]{10}$/;

const User: FC<any> = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    setToken(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE1ODk3MzYsInVzZXJuYW1lIjoiYWRtaW4ifQ.DwOTAPu7pC6KGSrlXa13-_w_6sMUncy7S7bV-NedTCU',
    );
    history.push('/');
  };

  return (
    <div className={styles['user-con']}>
      <div className={styles.logo}>
        <img src={require('@/assets/img/logo.png')} alt="" />
      </div>
      <Form initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label=""
          name="username"
          rules={[
            { required: true, message: '请输入您的用户名/手机号！' },
            { pattern: phoneReg, message: '请输入正确的手机号！' },
          ]}
        >
          <Input size="large" placeholder="用户名/手机号" />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: '请输入您的密码！' }]}
        >
          <Input.Password size="large" placeholder="密码" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>三天内自动登录</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.submit}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <p className={styles.forget} onClick={() => history.push('/forget')}>
        忘记密码?
      </p>
    </div>
  );
};

export default memo(User);
