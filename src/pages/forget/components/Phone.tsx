import { useState, FC, memo } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useCountDown } from 'ahooks';
import { useRequest, history, useDispatch } from 'umi';
import { sms, phoneLogin } from '../services';
import { setToken } from '@/utils/token';
import styles from './phone.less';

const phoneReg = /^[1][0-9]{10}$/;

const User: FC<any> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [countdown, setTargetDate] = useCountDown();

  /**
   * 获取验证码
   */
  const { loading: smsLoading, run: requestSms } = useRequest(sms, {
    manual: true,
    onSuccess: (res) => {
      alert('验证码' + res);
    },
  });
  const onSms = () => {
    const mobile = form.getFieldValue('phone');
    if (!phoneReg.test(mobile)) return message.error('请输入正常的手机号');
    requestSms({ mobile, smsMode: '0' });
    setTargetDate(Date.now() + 60000);
  };

  /**
   * 登陆
   */
  const { loading: loginLoading, run: requestLogin } = useRequest(phoneLogin, {
    manual: true,
    onSuccess: (res) => {
      setToken(res.token);
      dispatch({
        type: 'global/setUserInfo',
        payload: res.sysUser,
      });
      history.push('/');
    },
  });
  const onFinish = (values: any) => {
    const mobile = form.getFieldValue('phone');
    const captcha = form.getFieldValue('code');
    requestLogin({ mobile, captcha });
  };

  return (
    <div className={styles['user-con']}>
      <div className={styles.logo}>
        <img src={require('@/assets/img/logo.png')} alt="" />
      </div>
      <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label=""
          name="phone"
          rules={[
            { required: true, message: '请输入您的手机号！' },
            { pattern: phoneReg, message: '请输入正确的手机号！' },
          ]}
        >
          <Input size="large" placeholder="手机号" />
        </Form.Item>

        <Form.Item
          label=""
          name="code"
          rules={[{ required: true, message: '请输入验证码！' }]}
        >
          <div className={styles.code}>
            <Input size="large" placeholder="输入验证码" />
            <Button
              size="large"
              type="primary"
              onClick={onSms}
              loading={smsLoading}
              disabled={countdown !== 0}
            >
              {countdown !== 0
                ? `剩余${Math.round(countdown / 1000)}秒`
                : '获取验证码'}
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loginLoading}
            className={styles.submit}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <p className={styles.forget}>
        已有账号？
        <span onClick={() => history.push('/login')}>登录</span>
      </p>
    </div>
  );
};

export default memo(User);
